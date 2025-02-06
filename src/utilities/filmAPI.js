import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import movieAPILink from "../utilities/API";

const useFetchFilms = (token, trigger, setLoading) => {
  const url = `${movieAPILink}/movies?limit=100`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const { data, status, toggle, error, fetchFunction } = useFetch(url, options);

  useEffect(() => {
    if (token) {
      fetchFunction();
      setLoading(false);
    }
  }, [token, trigger]);

  return { data, fetchFunction };
};

export default useFetchFilms;

export const useCreateFilm = (film, token) => {
  const url = `${movieAPILink}/movies`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(film),
  };

  const { status, toggle, error, fetchFunction } = useFetch(url, options);

  return { status, toggle, error, fetchFunction };
};

// export async function handleImport(file) {
//   const formData = new FormData();
//   formData.append("movies", file);

//   await fetch(`${movieAPILink}/movies/import`, {
//     method: "POST",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       Authorization: token,
//     },
//     body: formData,
//   })
//     .then((response) => {
//       setAlert({
//         ...alertInfo,
//         variant: "default",
//         status: true,
//         title: "Success",
//         description: "Films were added.",
//       });
//       return response.text();
//     })
//     .catch((error) => {
//       setAlert({
//         ...alertInfo,
//         status: true,
//         variant: "destructive",
//         title: "Fail!",
//         description: "Films were NOT added.",
//       });
//       throw new Error(`Error: ${error}`);
//     });

//   setTrigger(!trigger);
// }

// export const deleteFilm = async (filmId) => {
//   try {
//     const response = await fetch(`${movieAPILink}/movies/${filmId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: token,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to delete film with ID: ${filmId}`);
//     }
//   } catch (err) {
//     throw new Error(`Film not deleted. Error: ${err}`);
//   }
// };

// export const deleteOneFilm = async (filmId) => {
//   try {
//     await deleteFilm(filmId);
//     setTrigger((prev) => !prev);
//     setAlert({
//       ...alertInfo,
//       variant: "default",
//       status: true,
//       title: "Deleted",
//       description: "Film was deleted.",
//     });
//   } catch (err) {
//     console.error("Error deleting films: ", err);
//     setAlert({
//       ...alertInfo,
//       status: true,
//       variant: "destructive",
//       title: "Fail!",
//       description: "Films were NOT added.",
//     });
//   }
// };

// export const handleDeleteAll = async () => {
//   try {
//     await Promise.all(films.map((film) => deleteFilm(film.id)));
//     setTrigger((prev) => !prev);
//     setAlert({
//       ...alertInfo,
//       variant: "default",
//       status: true,
//       title: "Deleted",
//       description: "All films were deleted.",
//     });
//   } catch (err) {
//     console.error("Error deleting films: ", err);
//   }
// };
