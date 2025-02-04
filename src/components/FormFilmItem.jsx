import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { React, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const FormFilmItem = ({
  index,
  setFilmItem,
  filmItem,
  deleteForm,
  showDelete,
}) => {
  let [film, setFilm] = useState({
    id: index,
    title: "",
    year: "",
    format: "DVD",
    actors: [""],
  });

  const [select, setSelect] = useState("DVD");

  const validateForm = (obj) => {
    const valid = Object.values(obj).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      if (typeof value === "number") {
        return value;
      }
      if (typeof value === "object") {
        return validateForm(value);
      }
    });

    return valid;
  };

  useEffect(() => {
    const valid = validateForm(film);

    setFilmItem(
      filmItem.map((item) =>
        item.id === index ? { ...item, valid: valid, item: film } : item,
      ),
    );
  }, [film]);

  const setInput = (e) => {
    let value = e.target.value;
    if (e.target.name == "year") {
      value = Number(value);
    }

    const newFilm = { ...film, [e.target.name]: value };
    setFilm(newFilm);
  };

  const updateSelect = (value) => {
    setSelect(value);
    const newFilm = { ...film, format: value };
    setFilm(newFilm);
  };

  const addStarInputs = () => {
    setFilm((prevFilm) => ({
      ...prevFilm,
      actors: [...prevFilm.actors, ""],
    }));
  };

  const handleActors = (e, id) => {
    const newFilmFunction = (prevFilm) => ({
      ...prevFilm,
      actors: prevFilm.actors.map((actor, index) =>
        index === id ? e.target.value : actor,
      ),
    });

    setFilm(newFilmFunction(film));
  };

  const deleteInput = (id) => {
    const updatedActors = film.actors.filter((actor, index) => index !== id);
    setFilm({ ...film, actors: updatedActors });
  };

  return (
    <div className="rounded-xl border-2 border-gray-400 p-4 pt-2">
      {showDelete && (
        <div className="flex justify-end">
          <Button type="button" onClick={() => deleteForm(index)}>
            Delete
          </Button>
        </div>
      )}

      <div className="mb-4">
        <Label htmlFor={`title-${index}`} className="mb-2 font-bold">
          Title
        </Label>
        <Input
          name="title"
          value={film.title}
          onChange={(e) => setInput(e)}
          id={`title-${index}`}
          type="text"
          placeholder="title"
        ></Input>
      </div>

      <div className="mb-4">
        <Label htmlFor={`year-${index}`} className="mb-2 font-bold">
          Release year
        </Label>
        <Input
          name="year"
          value={film.year}
          onChange={(e) => setInput(e)}
          id={`year-${index}`}
          type="number"
          placeholder="Release Year"
        ></Input>
      </div>

      <div className="mb-4">
        <Label htmlFor={`format-${index}`} className="mb-2 font-bold">
          Format
        </Label>
        <Select value={select} onValueChange={(value) => updateSelect(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="DVD">DVD</SelectItem>
              <SelectItem value="VHS">VHS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Label className="mb-2 font-bold">Stars</Label>
      <ul className="mb-4">
        {film.actors.map((actor, index) => {
          return (
            <li key={index} className="flex gap-2">
              <Input
                name={`star-${index}`}
                value={actor}
                onChange={(e) => handleActors(e, index)}
                className="mb-2 ml-2"
                type="text"
                placeholder="star name"
              ></Input>
              {index !== 0 && (
                <Button type="button" onClick={() => deleteInput(index)}>
                  X
                </Button>
              )}
            </li>
          );
        })}
      </ul>

      <a
        onClick={addStarInputs}
        className="block w-full cursor-pointer text-center transition duration-500 hover:text-gray-950 hover:underline"
      >
        + add star
      </a>
    </div>
  );
};

export default FormFilmItem;
