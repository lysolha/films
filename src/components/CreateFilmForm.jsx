import { React, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";
import FormFilmItem from "./FormFilmItem";

const CreateFilmForm = () => {
  let [createdPost, setValue] = useState({});
  let [filmItem, setFilmItem] = useState([""]);

  const handleInputValue = (e) => {
    let editedPost = { ...createdPost };
    const key = e.target.name;

    editedPost[key] = e.target.value;

    setValue(editedPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className="flex flex-col space-y-3.5 my-4" onSubmit={handleSubmit}>
      {filmItem.map((_, index) => {
        return <FormFilmItem key={index} index={index}></FormFilmItem>;
      })}
      ;<Button disabled={Object.keys(createdPost).length === 0}>Save</Button>
    </form>
  );
};

export default CreateFilmForm;
