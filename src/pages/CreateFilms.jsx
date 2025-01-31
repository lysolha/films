import React from "react";
import CreateFilmForm from "../components/CreateFilmForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CreateFilms = ({ handleCreateFilm, handleFileChange, handleImport }) => {
  const navigator = useNavigate();
  const goToImport = () => {
    navigator("/import-films");
  };

  const goHome = () => {
    navigator("/");
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <Button onClick={goToImport}>Import file</Button>
      </div>
      <CreateFilmForm
        goHome={goHome}
        handleCreateFilm={handleCreateFilm}
      ></CreateFilmForm>
    </div>
  );
};

export default CreateFilms;
