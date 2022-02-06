import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getnotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMDJjYzFkYTRjZmM5NmYzOGIzZTBmIn0sImlhdCI6MTY0MzM4Njc2NH0.3vLXRe6QCZwPxg43U-OP6tx5V3xCZALqgDAGlRssA9s",
      },
    });
    const json = await response.json();

    setNotes(json);
  };
  // add a note

  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMDJjYzFkYTRjZmM5NmYzOGIzZTBmIn0sImlhdCI6MTY0MzM4Njc2NH0.3vLXRe6QCZwPxg43U-OP6tx5V3xCZALqgDAGlRssA9s",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    console.log("added a new note");
    const note = {
      _id: "61ff9c4ef247b39e04c9d328",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: title,
      description: description,
      tag: tag,
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // delete a note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMDJjYzFkYTRjZmM5NmYzOGIzZTBmIn0sImlhdCI6MTY0MzM4Njc2NH0.3vLXRe6QCZwPxg43U-OP6tx5V3xCZALqgDAGlRssA9s",
      },
    });

    const json = await response.json();

    console.log("deleting the id  " + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // edit a note
  // api call
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMDJjYzFkYTRjZmM5NmYzOGIzZTBmIn0sImlhdCI6MTY0MzM4Njc2NH0.3vLXRe6QCZwPxg43U-OP6tx5V3xCZALqgDAGlRssA9s",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // logic to edit a note in client site
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
