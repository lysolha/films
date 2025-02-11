import { useEffect, useMemo, useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : { sortType: "", searchValue: "" };
  });

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  return [filters, setFilters];
};

export const useSortFilms = (films, sortType) => {
  const sortArray = (films) => {
    const updatedArr = [...films].sort((current, next) => {
      switch (sortType) {
        case "title-A":
          return current.title.localeCompare(next.title);
        case "title-Z":
          return next.title.localeCompare(current.title);
        case "year-A":
          return current.year - next.year;
        case "year-Z":
          return next.year - current.year;
        default:
          return 0;
      }
    });

    return updatedArr;
  };

  let sortedArray = useMemo(() => {
    if (sortType) {
      return sortArray(films);
    }
    return films;
  }, [sortType, films]);

  return sortedArray;
};

export const useSortedAndSearchedArr = (
  films,
  sortType = "",
  searchValue = "",
) => {
  const sortedArr = useSortFilms(films, sortType);
  console.log("test");

  const sortedAndSearchedArr = useMemo(() => {
    const test = [...sortedArr].filter((element) =>
      element.title.includes(searchValue),
    );
    return test;
  }, [searchValue, sortedArr]);

  return { sortedAndSearchedArr };
};
