import { useState, useLayoutEffect, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import movieAPILink from "./utilities/API.js";
import authContext from "./context/authtorisation.jsx";
import AlertItem from "./components/AlertItem.jsx";
import CreateFilms from "./pages/CreateFilms.jsx";
import ImportFilms from "./pages/ImportFilms.jsx";

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [alertInfo, setAlert] = useState({
    status: false,
    variant: "default",
    title: "",
    description: "",
  });

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
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleCreateFilm(film) {
    fetch(`${movieAPILink}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(film),
    })
      .then((response) => {
        setAlert({
          ...alertInfo,
          variant: "default",
          status: true,
          title: "Success",
          description: "Films were added.",
        });
        return response.text();
      })
      .catch((err) => {
        setAlert({
          ...alertInfo,
          status: true,
          variant: "destructive",
          title: "Fail!",
          description: "Films were NOT added.",
        });
        throw new Error(`Error: ${err}`);
      })
      .finally(() => {
        setTrigger(!trigger);
      });
  }

  async function handleImport() {
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
        setAlert({
          ...alertInfo,
          variant: "default",
          status: true,
          title: "Success",
          description: "Films were added.",
        });
        return response.text();
      })
      .catch((error) => {
        setAlert({
          ...alertInfo,
          status: true,
          variant: "destructive",
          title: "Fail!",
          description: "Films were NOT added.",
        });
        throw new Error(`Error: ${error}`);
      });

    setTrigger(!trigger);
  }

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

    setTrigger(!trigger);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [token, trigger]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <authContext.Provider value={token}>
        <Router>
          <div className="m-5">
            <Routes>
              <Route
                index
                element={
                  <App
                    handleFileChange={handleFileChange}
                    handleImport={handleImport}
                    fetchFilms={fetchFilms}
                    films={films}
                    handleDeleteAll={handleDeleteAll}
                    loading={loading}
                  />
                }
              ></Route>
              <Route path="about" element={<About />} />
              <Route
                path="create-film"
                element={
                  <CreateFilms
                    handleCreateFilm={handleCreateFilm}
                    handleFileChange={handleFileChange}
                    handleImport={handleImport}
                  />
                }
              />
              <Route
                path="import-films"
                element={
                  <ImportFilms
                    handleFileChange={handleFileChange}
                    handleImport={handleImport}
                  />
                }
              />
            </Routes>
          </div>

          {alertInfo.status && (
            <AlertItem
              variant={alertInfo.variant}
              title={alertInfo.title}
              description={alertInfo.description}
            ></AlertItem>
          )}

          <Footer>
            <nav className="p-5">
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/">App</Link>
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
