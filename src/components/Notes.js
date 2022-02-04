import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnotes } = context;

  useEffect(() => {
    getnotes();
  }, [getnotes]);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2 className="my-4 mx-4">YOUR NOTES</h2>

        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
