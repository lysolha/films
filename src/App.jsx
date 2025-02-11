/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { React } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAllButton from "./components/DeleteAllButton";
import FilmList from "./components/FilmList";
import SelectFilter from "./components/SelectFilter";
import { useFilters, useSortedAndSearchedArr } from "./hooks/useFilterFilms";

export default function App({ films, handleDeleteAll, loading }) {
  const options = [
    { id: 1, value: "title-A", name: "title A->Z" },
    { id: 2, value: "title-Z", name: "title Z->A" },
    { id: 3, value: "year-A", name: "old -> to new year" },
    { id: 4, value: "year-Z", name: "new -> to old year" },
  ];

  const [filters, setFilters] = useFilters();
  const { sortedAndSearchedArr } = useSortedAndSearchedArr(
    films,
    filters.sortType,
    filters.searchValue,
  );

  const navigate = useNavigate();

  const goToCreateFilm = () => {
    navigate("/create-film");
  };

  return (
    <div>
      <div className="mb-5 flex w-full justify-end gap-2">
        <Button onClick={goToCreateFilm} variant="outline">
          Create new films
        </Button>
        <DeleteAllButton handleDeleteAll={handleDeleteAll}></DeleteAllButton>
      </div>

      <SelectFilter
        filters={filters}
        setFilters={setFilters}
        defaultValue="Sort by"
        options={options}
      ></SelectFilter>

      {loading && (
        <div className="w-full text-center">
          <span className="size-80 font-bold">Loading</span>
        </div>
      )}

      {!loading && <FilmList filmsList={sortedAndSearchedArr}></FilmList>}
    </div>
  );
}
