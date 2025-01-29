import { useState, useLayoutEffect, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import movieAPILink from "./utilities/API.js";
import authContext from "./context/authtorisation.jsx";

const Main = () => {
  async function fetchSession() {
    fetch(`${movieAPILink}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "petro@gmail.com",
        password: "super-password",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setToken(result.token);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [token, setToken] = useState(null);
  const [films, setFilms] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchFilms() {
    fetch(`${movieAPILink}/movies?limit=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setFilms(data.data))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== "text/plain") {
      alert("Please upload a valid .txt file");
      return;
    }
    setFile(event.target.files[0]);
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log("File content:", e.target.result);
    };
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("movies", file);
    console.log(file);

    fetch(`${movieAPILink}/movies/import`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log("File uploaded successfully", data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };

  return (
    <authContext.Provider value={token}>
      <Router>
        <Routes>
          <Route
            path="app"
            element={
              <App
                handleFileChange={handleFileChange}
                handleUpload={handleUpload}
                fetchFilms={fetchFilms}
                films={films}
              />
            }
          ></Route>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>

        <Footer>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/app">App</Link>
              </li>
            </ul>
          </nav>
        </Footer>
      </Router>
    </authContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
