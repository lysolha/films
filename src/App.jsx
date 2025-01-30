/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateFilmForm from "./components/CreateFilmForm";
import { Input } from "@/components/ui/input";

export default function App({
  films,
  handleUpload,
  handleFileChange,
  handleDeleteAll,
  loading,
}) {
  const [isImport, setIsImport] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open) {
      setIsImport(false);
    }
  }, [open]);

  console.log(films);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create new films</Button>
        </DialogTrigger>
        {!isImport ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new films</DialogTitle>
              <CreateFilmForm></CreateFilmForm>
              <Button onClick={() => setIsImport(true)}> Import file </Button>
            </DialogHeader>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import films</DialogTitle>
              <DialogDescription>
                Load a file with films in .txt format
              </DialogDescription>
              <Input
                onChange={handleFileChange}
                type="file"
                id="bulkImport"
                multiple
              />
              <Button onClick={() => handleUpload(setOpen)}> Import </Button>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>

      <Button onClick={handleDeleteAll}> Delete all films </Button>
      {loading && <div className="w-full">loading</div>}

      {!loading && (
        <ul>
          {films && films.length
            ? films.map((film) => {
                return (
                  <li key={film.id}>
                    {film.id} {film.title}
                  </li>
                );
              })
            : "No films"}
        </ul>
      )}
    </div>
  );
}
