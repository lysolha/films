import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const ImportFilms = ({ handleFileChange, handleUpload }) => {
  const navigator = useNavigate();
  const upload = () => {
    handleUpload();
    navigator("/");
  };

  return (
    <div>
      <Input onChange={handleFileChange} type="file" id="bulkImport" multiple />
      <Button onClick={upload}> Import </Button>
    </div>
  );
};

export default ImportFilms;
