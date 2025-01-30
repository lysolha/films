import { React, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";

const FormFilmItem = ({ index }) => {
  let [inputs, setInputs] = useState([]);
  const addInputs = () => {
    setInputs([...inputs, ""]);
  };
  return (
    <>
      <Label htmlFor={`title-${index}`}>Title</Label>
      <Input id={`title-${index}`} type="text" placeholder="title"></Input>

      <Label htmlFor={`year-${index}`}>Title</Label>
      <Input
        id={`year-${index}`}
        type="text"
        placeholder="Release Year"
      ></Input>

      <Label htmlFor={`format-${index}`}>Title</Label>
      <Input id={`format-${index}`} type="text" placeholder="Format"></Input>

      <Label>Stars</Label>
      {inputs.length > 0 && (
        <ul>
          {inputs.map((_, index) => {
            return (
              <li key={index}>
                <Input type="text" placeholder="star name"></Input>
              </li>
            );
          })}
        </ul>
      )}

      <a onClick={addInputs}>add star</a>
    </>
  );
};

export default FormFilmItem;
