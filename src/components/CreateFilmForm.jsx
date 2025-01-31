import { React, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";
import FormFilmItem from "./FormFilmItem";

const CreateFilmForm = ({ goHome, handleCreateFilm }) => {
  let [filmItem, setFilmItem] = useState([{ valid: false, item: [] }]);
  let [isValid, setIsValid] = useState(false);

  const addForm = () => {
    setFilmItem([...filmItem, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filmItem.forEach((film) => {
      handleCreateFilm(film.item);
    });

    goHome();
  };

  useEffect(() => {
    setIsValid(filmItem.every((film) => film.valid));
  }, [filmItem]);

  console.log(filmItem);

  return (
    <form className="flex flex-col space-y-3.5 my-4" onSubmit={handleSubmit}>
      {filmItem.map((item, index) => {
        return (
          <FormFilmItem
            filmItem={filmItem}
            setFilmItem={setFilmItem}
            key={index}
            index={index}
          ></FormFilmItem>
        );
      })}

      <a
        onClick={addForm}
        className="block w-full text-center hover:underline hover:text-gray-950 cursor-pointer transition duration-500"
      >
        Add film
      </a>

      <Button disabled={isValid === false}>Save</Button>
    </form>
  );
};

export default CreateFilmForm;
