/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import DeleteAllButton from "./components/DeleteAllButton";
import FilmCard from "./components/FilmCard";

export default function App({ films, handleDeleteAll, loading }) {
  const navigate = useNavigate();

  const goToCreateFilm = () => {
    navigate("/create-film");
  };

  return (
    <div>
      <Button onClick={goToCreateFilm} variant="outline">
        Create new films
      </Button>

      <DeleteAllButton handleDeleteAll={handleDeleteAll}></DeleteAllButton>
      {loading && (
        <div className="w-full text-center">
          <span className="size-80 font-bold">Loading</span>
        </div>
      )}

      {!loading &&
        (films && films.length ? (
          <div>
            <ul className="row mt-5 flex flex-wrap gap-6">
              {films.map((film) => (
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
        ))}
    </div>
  );
}
