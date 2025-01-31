import { React, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormFilmItem = ({ index, setFilmItem, filmItem }) => {
  let [film, setFilm] = useState({
    title: "",
    year: "",
    format: "",
    actors: [""],
  });
  const [isValid, setIsValid] = useState(false);
  const [select, setSelect] = useState("DVD");

  const addInputs = () => {
    setFilm((prevFilm) => ({
      ...prevFilm,
      actors: [...prevFilm.actors, ""],
    }));

    setIsValid(false);
  };

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

  const setInput = (e) => {
    let value = e.target.value;
    if (e.target.name == "year") {
      value = Number(value);
    }

    const newFilm = { ...film, [e.target.name]: value };
    setFilm(newFilm);

    const valid = validateForm(newFilm);
    setIsValid(valid);

    setFilmItem(
      filmItem.map((item, id) =>
        id === index ? { ...item, valid: valid, item: newFilm } : item
      )
    );
  };

  const handleActors = (e, id) => {
    const newFilmFunction = (prevFilm) => ({
      ...prevFilm,
      actors: prevFilm.actors.map((actor, index) =>
        index === id ? e.target.value : actor
      ),
    });
    const newFilm = newFilmFunction(film);

    setFilm(newFilm);
    let valid = isValid;

    if (!isValid) {
      valid = validateForm(newFilm);
      setIsValid(valid);
    }

    setFilmItem(
      filmItem.map((item, id) =>
        id === index ? { ...item, valid: valid, item: newFilm } : item
      )
    );
  };

  const deleteInput = (id) => {
    const updatedActors = film.actors.filter((actor, index) => index !== id);
    const updatedFilm = { ...film, actors: updatedActors };
    setFilm(updatedFilm);

    let valid = isValid;
    if (!isValid) {
      valid = validateForm(updatedFilm);
      setIsValid(valid);
    }

    setFilmItem(
      filmItem.map((item, id) =>
        id === index ? { ...item, valid: valid, item: updatedFilm } : item
      )
    );
  };

  const updateSelect = (value) => {
    setSelect(value);
    const newFilm = { ...film, format: value };
    setFilm(newFilm);

    const valid = validateForm(newFilm);
    setIsValid(valid);

    setFilmItem(
      filmItem.map((item, id) =>
        id === index ? { ...item, valid: valid, item: newFilm } : item
      )
    );
  };

  return (
    <div className="p-4 rounded-xl border-2 border-gray-400">
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
            <li key={index}>
              <Input
                name={`star-${index}`}
                value={actor}
                onChange={(e) => handleActors(e, index)}
                className="mb-2 ml-2"
                type="text"
                placeholder="star name"
              ></Input>
              {index !== 0 && (
                <Button onClick={() => deleteInput(index)}>X</Button>
              )}
            </li>
          );
        })}
      </ul>

      <a
        onClick={addInputs}
        className="block w-full text-center hover:underline hover:text-gray-950 cursor-pointer transition duration-500"
      >
        + add star
      </a>
    </div>
  );
};

export default FormFilmItem;
