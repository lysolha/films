import { useEffect, useState } from "react";
import movieAPILink from "../utilities/API";

const useFetchFilms = (token, setLoading, trigger) => {
  const [films, setFilms] = useState([]);

  console.log(token);

  const fetchFilms = async () => {
    await fetch(`${movieAPILink}/movies?limit=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilms(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      fetchFilms();
    }
  }, [token, trigger]);

  return { films, fetchFilms };
};

export default useFetchFilms;
