// /* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAllButton from "./components/DeleteAllButton";
import FilmList from "./components/FilmList";
import SelectFilter from "./components/SelectFilter";
import { AuthContext } from "./context/authtorisation.jsx";
import { useFilters } from "./hooks/useFilterFilms";
import movieAPILink from "./utilities/API.js";

export default function App({ trigger, handleDeleteAll, loading, setLoading }) {
  const options = [
    { id: 1, value: "title-A", order: "DESC", name: "title A->Z" },
    { id: 2, value: "title-Z", order: "ASC", name: "title Z->A" },
    { id: 3, value: "year-A", order: "DESC", name: "old -> to new year" },
    { id: 4, value: "year-Z", order: "ASC", name: "new -> to old year" },
  ];
  const [filters, setFilters] = useFilters();
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useContext(AuthContext);

  const fetchMovies = async () => {
    const queryParams = new URLSearchParams();

    if (filters.searchValue && filters.searchValue.length >= 3) {
      queryParams.append("search", filters.searchValue);
    }

    if (limit) queryParams.append("limit", limit);
    if (offset) queryParams.append("offset", offset);
    if (filters.sortType) {
      const valueArr = filters.sortType.split("-");
      queryParams.append("sort", valueArr[0]);
    }
    if (filters.order) queryParams.append("order", filters.order);

    const url = `${movieAPILink}/movies?${queryParams.toString()}`;
    console.log("filters", filters);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();

    setMovies(data.data);
    if (data.meta) {
      setTotalCount(data.meta.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [filters.order, limit, offset]);

  useEffect(() => {
    fetchMovies();
    setOffset(0);
    setCurrentPage(1);
  }, [filters.searchValue]);

  const totalPages = Math.ceil(totalCount / limit);

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

      {!loading && (
        <div>
          <FilmList filmsList={movies}></FilmList>{" "}
          <div className="flex w-full flex-col items-center justify-center">
            <span className="my-3 w-full text-center">
              Total count: {totalPages}
            </span>
            <div>
              <Button
                onClick={() => {
                  setOffset(offset - limit);
                  setCurrentPage(currentPage - 1);
                }}
                disabled={offset === 0}
              >
                {"<"}
              </Button>
              <span className="mx-5 h-fit">{currentPage}</span>
              <Button
                onClick={() => {
                  setOffset(offset + limit);
                  setCurrentPage(currentPage + 1);
                }}
                disabled={currentPage >= totalPages}
              >
                {">"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
