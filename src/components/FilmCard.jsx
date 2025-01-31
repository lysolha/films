import React from "react";
import { CassetteTape } from "lucide-react";

const FilmCard = ({ film }) => {
  return (
    <div className="flex flex-col card__small text-center">
      <div className="card__film-image h-1/2 flex justify-center items-center">
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
