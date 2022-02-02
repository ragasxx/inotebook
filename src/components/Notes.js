import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div className="row my-3">
      <h2 className="my-4 mx-4">YOUR NOTES</h2>

      {notes.map((note) => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
};

export default Notes;
