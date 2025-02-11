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

const UpdateFilm = ({ inputFilm, fetchUpdateFilm }) => {
  let [filmItem, setFilmItem] = useState({
    title: inputFilm.title,
    year: inputFilm.year,
    format: inputFilm.format,
    actors: inputFilm.actors.map((actor) => actor.name),
  });
  const [select, setSelect] = useState(filmItem.format);

  let [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUpdateFilm(filmItem, inputFilm.id);
  };

  const addStarInputs = () => {
    setFilmItem((prevFilm) => ({
      ...prevFilm,
      actors: [...prevFilm.actors, ""],
    }));
  };

  const updateSelect = (value) => {
    setFilmItem({ ...filmItem, format: value });
    setSelect(value);
  };

  const handleActors = (e, id) => {
    const newFilmFunction = {
      ...filmItem,
      actors: filmItem.actors.map((actor, index) =>
        index === id ? e.target.value : actor,
      ),
    };

    setFilmItem(newFilmFunction);
  };

  const deleteInput = (id) => {
    const updatedActors = filmItem.actors.filter(
      (actor, index) => index !== id,
    );
    setFilmItem({ ...filmItem, actors: updatedActors });
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

  useEffect(() => {
    setIsValid(validateForm(filmItem));
  }, [filmItem]);

  return (
    <form
      className="my-4 flex w-full flex-col space-y-3.5"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <Label htmlFor={`title-${filmItem.id}`} className="mb-2 font-bold">
          Title
        </Label>
        <Input
          name="title"
          value={filmItem.title}
          onChange={(e) => setFilmItem({ ...filmItem, title: e.target.value })}
          id={`title-${filmItem.id}`}
          type="text"
          placeholder="title"
        ></Input>
      </div>

      <div className="mb-4">
        <Label htmlFor={`year-${filmItem.id}`} className="mb-2 font-bold">
          Release year
        </Label>
        <Input
          name="year"
          value={filmItem.year}
          onChange={(e) =>
            setFilmItem({ ...filmItem, year: Number(e.target.value) })
          }
          id={`year-${filmItem.id}`}
          type="number"
          placeholder="Release Year"
        ></Input>
      </div>

      <div className="mb-4">
        <Label htmlFor={`format-${filmItem.id}`} className="mb-2 font-bold">
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
        {filmItem.actors.map((actor, index) => {
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
              {filmItem.actors.length > 1 && (
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
      <Button disabled={isValid === false}>Save</Button>
    </form>
  );
};

export default UpdateFilm;
