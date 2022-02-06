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

    console.log("added a new note");
    const note = {
      _id: "61f7fdefc70715375b5ed6362",
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
    const response = await fetch(
      `${host}/api/notes/updatenote/61f7fdefc70715375b5ed6362`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMDJjYzFkYTRjZmM5NmYzOGIzZTBmIn0sImlhdCI6MTY0MzM4Njc2NH0.3vLXRe6QCZwPxg43U-OP6tx5V3xCZALqgDAGlRssA9s",
        },

        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();
    console.log(json);

    // logic to edit a note in client site

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
      break;
    }
    setNotes(notes);
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
