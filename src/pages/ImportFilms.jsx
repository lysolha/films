import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const ImportFilms = ({ handleImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const navigator = useNavigate();
  const upload = () => {
    handleImport(file);
    navigator("/");
  };

  return (
    <div>
      <Input onChange={handleFileChange} type="file" id="bulkImport" multiple />
      <Button disabled={!file} onClick={upload}>
        Import
      </Button>
    </div>
  );
};

export default ImportFilms;
