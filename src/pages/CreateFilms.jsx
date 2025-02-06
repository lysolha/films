import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import CreateFilmForm from "../components/CreateFilmForm";

const CreateFilms = ({ setTrigger, setAlert, alertInfo }) => {
  const navigator = useNavigate();
  const goToImport = () => {
    navigator("/import-films");
  };

  const goHome = () => {
    navigator("/");
  };

  return (
    <div>
      <div className="flex w-full justify-end">
        <Button onClick={goToImport}>Import file</Button>
      </div>
      <CreateFilmForm
        setTrigger={setTrigger}
        goHome={goHome}
        setAlert={setAlert}
        alertInfo={alertInfo}
      ></CreateFilmForm>
    </div>
  );
};

export default CreateFilms;
