import { React, useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { AuthContext } from "../context/authtorisation";
import { useCreateFilm } from "../utilities/filmAPI";
import FormFilmItem from "./FormFilmItem";

const CreateFilmForm = ({ setTrigger, goHome, setAlert, alertInfo }) => {
  let [filmItem, setFilmItem] = useState([
    { id: crypto.randomUUID(), valid: false, item: [] },
  ]);

  const { token } = useContext(AuthContext);
  let [isValid, setIsValid] = useState(false);
  let showFormDelete = false;

  const { status, toggle, error, fetchFunction } = useCreateFilm(
    filmItem,
    token,
  );

  const addForm = () => {
    setFilmItem([
      ...filmItem,
      { id: crypto.randomUUID(), valid: false, item: [] },
    ]);
  };

  const deleteForm = (id) => {
    const updatedList = filmItem.filter((film) => {
      return film.id !== id;
    });

    setFilmItem(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const film of filmItem) {
      await fetchFunction({ body: JSON.stringify(film.item) });
    }
  };

  useEffect(() => {
    setIsValid(filmItem.every((film) => film.valid));
  }, [filmItem]);

  useEffect(() => {
    if (status == 1) {
      setAlert({
        ...alertInfo,
        variant: "default",
        status: true,
        title: "Success",
        description: "Films were added.",
      });

      setTrigger((prev) => !prev);
      goHome();
    } else if (status == 0) {
      setAlert({
        ...alertInfo,
        status: true,
        variant: "destructive",
        title: "Fail!",
        description: `Films were NOT added. Error: ${error}`,
      });
    }
  }, [toggle]);

  return (
    <form className="my-4 flex flex-col space-y-3.5" onSubmit={handleSubmit}>
      {filmItem.map((film) => {
        showFormDelete = filmItem.length > 1;
        return (
          <FormFilmItem
            filmItem={filmItem}
            setFilmItem={setFilmItem}
            key={film.id}
            index={film.id}
            showDelete={showFormDelete}
            deleteForm={deleteForm}
          ></FormFilmItem>
        );
      })}

      <a
        onClick={addForm}
        className="block w-full cursor-pointer text-center transition duration-500 hover:text-gray-950 hover:underline"
      >
        Add film
      </a>

      <Button disabled={isValid === false}>Save</Button>
    </form>
  );
};

export default CreateFilmForm;
