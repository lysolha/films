import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const FileInput = ({ setFile }) => {
  const [drag, setDrag] = useState(false);
  const [fileName, setFileName] = useState("");

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const deleteFile = () => {
    setFile(null);
    setDrag(false);
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file.name);
    setDrag(true);
  };

  return (
    <div>
      {drag ? (
        <div
          className="import_window"
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          <div>File: {fileName}</div>
          <Button type="button" onClick={deleteFile}>
            X
          </Button>
        </div>
      ) : (
        <input
          type="file"
          className="import_window h-40"
          onChange={(e) => fileHandler(e)}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        ></input>
      )}
    </div>
  );
};

export default FileInput;
