import { useContext, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import App from "./App.jsx";
import AlertItem from "./components/AlertItem.jsx";
import Footer from "./components/Footer.jsx";
import { AuthContext } from "./context/authtorisation.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import CreateFilms from "./pages/CreateFilms.jsx";
import FilmInfo from "./pages/FilmInfo.jsx";
import ImportFilms from "./pages/ImportFilms.jsx";
import movieAPILink from "./utilities/API.js";
import useFetchFilms from "./utilities/filmAPI.js";

const Main = () => {
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [alertInfo, setAlert] = useState({
    status: false,
    variant: "default",
    title: "",
    description: "",
  });

  const resetAlert = () => {
    setAlert({ ...alertInfo, status: false });
  };

  const { data, fetchFunction } = useFetchFilms(token, trigger, setLoading);

  async function handleImport(file) {
    const formData = new FormData();
    formData.append("movies", file);

    await fetch(`${movieAPILink}/movies/import`, {
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

  const deleteFilm = async (filmId) => {
    try {
      const response = await fetch(`${movieAPILink}/movies/${filmId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete film with ID: ${filmId}`);
      }
    } catch (err) {
      throw new Error(`Film not deleted. Error: ${err}`);
    }
  };

  const deleteOneFilm = async (filmId) => {
    try {
      await deleteFilm(filmId);
      setTrigger((prev) => !prev);
      setAlert({
        ...alertInfo,
        variant: "default",
        status: true,
        title: "Deleted",
        description: "Film was deleted.",
      });
    } catch (err) {
      console.error("Error deleting films: ", err);
      setAlert({
        ...alertInfo,
        status: true,
        variant: "destructive",
        title: "Fail!",
        description: "Films were NOT added.",
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all(data.map((film) => deleteFilm(film.id)));
      setTrigger((prev) => !prev);
      setAlert({
        ...alertInfo,
        variant: "default",
        status: true,
        title: "Deleted",
        description: "All films were deleted.",
      });
    } catch (err) {
      console.error("Error deleting films: ", err);
    }
  };

  // useEffect(() => {
  //   fetchFilms();
  // }, [token, trigger]);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Router>
        <div className="m-5">
          <Routes>
            <Route
              index
              element={
                <App
                  token={token}
                  // fetchFilms={fetchFilms}
                  films={data}
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
                  setLoading={setLoading}
                  setTrigger={setTrigger}
                  setAlert={setAlert}
                  alertInfo={alertInfo}
                />
              }
            />
            <Route
              path="import-films"
              element={<ImportFilms handleImport={handleImport} />}
            />
            <Route
              path="film/:filmId"
              element={<FilmInfo deleteFilm={deleteOneFilm} token={token} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {alertInfo.status && (
          <AlertItem
            variant={alertInfo.variant}
            title={alertInfo.title}
            description={alertInfo.description}
            resetAlert={resetAlert}
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
    </div>
  );
};

export default Main;
