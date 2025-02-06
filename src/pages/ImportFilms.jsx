import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import { AuthContext } from "../context/authtorisation";
import { useHandleImport } from "../utilities/filmAPI";

const ImportFilms = ({ alertInfo, setAlert, setTrigger }) => {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const { data, status, toggle, error, fetchFunction } = useHandleImport(
    file,
    token,
  );

  const navigator = useNavigate();
  const upload = () => {
    fetchFunction();
  };

  useEffect(() => {
    if (status == 1) {
      setAlert({
        ...alertInfo,
        variant: "default",
        status: true,
        title: "Success",
        description: "Films were added.",
      });

      setTrigger((prev) => !prev);
      navigator("/");
    } else if (status == 0) {
      setAlert({
        ...alertInfo,
        status: true,
        variant: "destructive",
        title: "Fail!",
        description: `Films were NOT added. Error: ${error}`,
      });
    }
  }, [toggle]);

  return (
    <div>
      <a className="flex w-full justify-end" href="/movies.txt" download>
        <Button>Load Example</Button>
      </a>
      <FileInput setFile={setFile}></FileInput>
      <Button className="w-full" disabled={!file} onClick={upload}>
        Import
      </Button>
    </div>
  );
};

export default ImportFilms;
