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
import AlertItem from "./components/AlertItem.jsx";

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
      });
  }

  const [token, setToken] = useState(null);
  const [films, setFilms] = useState(null);
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .then((data) => {
        setFilms(data.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // if (file.type !== "text/plain") {
    //   alert("Please upload a valid .txt file");
    //   return;
    // }
    setFile(event.target.files[0]);
  };

  const handleUpload = (setOpen) => {
    const formData = new FormData();
    formData.append("movies", file);

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
        setOpen(false);
        setShowAlert(true);
        console.log("File uploaded successfully", data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });

    fetchFilms();
  };

  async function deleteFilm(filmId) {
    fetch(`${movieAPILink}/movies/${filmId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json)
      .catch((err) => {
        throw new Error(`Film not deleted. Error: ${err}`);
      });
  }

  const handleDeleteAll = () => {
    films.forEach((film) => {
      deleteFilm(film.id);
    });

    fetchFilms();
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [token]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <authContext.Provider value={token}>
        <Router>
          <div className="m-5">
            <Routes>
              <Route
                path="app"
                element={
                  <App
                    handleFileChange={handleFileChange}
                    handleUpload={handleUpload}
                    fetchFilms={fetchFilms}
                    films={films}
                    handleDeleteAll={handleDeleteAll}
                    loading={loading}
                  />
                }
              ></Route>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>

          {showAlert ? <AlertItem additionalClass="open"></AlertItem> : <></>}

          <Footer>
            <nav className="p-5">
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
    </div>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
