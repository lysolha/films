import { React, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";
import FormFilmItem from "./FormFilmItem";
import { v4 as uuidv4 } from "uuid";

const CreateFilmForm = ({ goHome, handleCreateFilm }) => {
  let [filmItem, setFilmItem] = useState([
    { id: crypto.randomUUID(), valid: false, item: [] },
  ]);
  let [isValid, setIsValid] = useState(false);
  let showDelete = false;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    filmItem.forEach((film) => {
      handleCreateFilm(film.item);
    });

    goHome();
  };

  useEffect(() => {
    console.log(filmItem);
    setIsValid(filmItem.every((film) => film.valid));
  }, [filmItem]);

  return (
    <form className="my-4 flex flex-col space-y-3.5" onSubmit={handleSubmit}>
      {filmItem.map((film) => {
        filmItem.length > 1 ? (showDelete = true) : (showDelete = false);
        return (
          <FormFilmItem
            filmItem={filmItem}
            setFilmItem={setFilmItem}
            key={film.id}
            index={film.id}
            showDelete={showDelete}
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
