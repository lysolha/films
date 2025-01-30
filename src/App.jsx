/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DeleteAllButton from "./components/DeleteAllButton";

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
      {loading && <div className="w-full">loading</div>}

      {!loading && (
        <ul>
          {films && films.length
            ? films.map((film) => {
                return (
                  <li key={film.id}>
                    {film.id} {film.title}
                  </li>
                );
              })
            : "No films"}
        </ul>
      )}
    </div>
  );
}
