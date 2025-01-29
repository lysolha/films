/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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

export default function App({
  fetchFilms,
  films,
  handleUpload,
  handleFileChange,
}) {
  return (
    <div>
      <Button onClick={fetchFilms}> Get films </Button>

      <Dialog>
        <DialogTrigger>Upload new films</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new films</DialogTitle>
            <CreateFilmForm></CreateFilmForm>
            <input
              onChange={handleFileChange}
              type="file"
              id="input"
              multiple
            />
            <Button onClick={handleUpload}> Load new films </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ul>
        {films
          ? films.map((film) => {
              return (
                <li key={film.id}>
                  {film.id} {film.title}
                </li>
              );
            })
          : "No films"}
      </ul>
    </div>
  );
}
