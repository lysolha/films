import React from "react";
import CreateFilmForm from "../components/CreateFilmForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CreateFilms = ({ handleFileChange, handleUpload }) => {
  const navigator = useNavigate();
  const goToImport = () => {
    navigator("/import-films");
  };

  return (
    <div>
      <CreateFilmForm></CreateFilmForm>
      <Button onClick={goToImport}>Import file</Button>
    </div>
  );
};

export default CreateFilms;
