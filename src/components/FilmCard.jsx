import { CassetteTape } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const FilmCard = ({ film }) => {
  const navigate = useNavigate();

  const goToCreateFilm = (id) => {
    navigate(`/film/${id}`);
  };

  return (
    <div
      onClick={() => goToCreateFilm(film.id)}
      className="card__small flex cursor-pointer flex-col text-center"
    >
      <div className="card__film-image flex h-1/2 items-center justify-center pt-3">
        <CassetteTape />
      </div>
      <div className="mt-auto p-5">
        <h2>{film.title}</h2>
        <h3>{film.year}</h3>
        <h3>{film.format}</h3>
      </div>
    </div>
  );
};

export default FilmCard;
