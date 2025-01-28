import React, { useEffect, useState } from "react";

export default function App(fetchFilms, openModule) {
  return (
    <div>
      <Button onClick={fetchFilms}> Get films </Button>
      <Button onClick={openModule}> Load new films </Button>
    </div>
  );
}
