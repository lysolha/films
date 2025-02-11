import { Button } from "@/components/ui/button";
import { CassetteTape } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateFilm from "../components/UpdateFilm";
import movieAPILink from "../utilities/API";

const FilmInfo = ({ token, deleteFilm }) => {
  const { filmId } = useParams();
  const [film, setFilm] = useState({ title: "", id: 0, year: 0, actors: [] });
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteFilm(filmId);
    navigate(`/`);
  };

  async function fetchFilm(filmId) {
    return await fetch(`${movieAPILink}/movies/${filmId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilm(data.data);
        return data.data;
      });
  }

  async function fetchUpdateFilm(film, id) {
    await fetch(`${movieAPILink}/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(film),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilm(data.data);
        setIsEdit(false);
        return data.data;
      });
  }

  useEffect(() => {
    fetchFilm(filmId);
  }, []);

  return (
    <div>
      <div className="mb-10 flex gap-10">
        <div className="card__film-image flex h-full items-center justify-center">
          <CassetteTape />
        </div>
        {isEdit ? (
          <UpdateFilm
            fetchUpdateFilm={fetchUpdateFilm}
            inputFilm={film}
          ></UpdateFilm>
        ) : (
          <div>
            <h3>ID: {filmId}</h3>
            <h2>Title: {film.title}</h2>
            <h3>Release year: {film.year}</h3>
            <h3>Format: {film.format}</h3>
            <h3>Actors:</h3>
            <ul>
              {film.actors.map((actor) => {
                return <li key={actor.id}>{actor.name}</li>;
              })}
            </ul>
            <Button onClick={setIsEdit} type="button">
              Update
            </Button>
            <Button onClick={handleDelete} type="button">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmInfo;
