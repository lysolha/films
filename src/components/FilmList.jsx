import React from "react";
import FilmCard from "./FilmCard";

const FilmList = ({ filmsList }) => {
  return (
    <div>
      {filmsList && filmsList.length ? (
        <div>
          <ul className="row mt-5 flex flex-wrap gap-6">
            {filmsList.map((film) => (
              <li key={film.id}>
                <FilmCard film={film} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full text-center">
          <span className="size-80 font-bold">No films</span>
        </div>
      )}
    </div>
  );
};

export default FilmList;
