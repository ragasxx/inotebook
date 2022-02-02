import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61f7fdefc70715375b5ed662",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "my title",
      description: "plz wake",
      tag: "person",
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    },
    {
      _id: "61f7fe08c70715375b5ed664",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "hello world",
      description: "plz wake me up",
      tag: "person",
      date: "2022-01-31T15:19:36.494Z",
      __v: 0,
    },
    {
      _id: "61f7fe11c70715375b5ed666",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "hello world 2",
      description: "plz wake me up 2",
      tag: "person 2",
      date: "2022-01-31T15:19:45.061Z",
      __v: 0,
    },
    {
      _id: "61f7fdefc70715375b5ed6362",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "my title",
      description: "plz wake",
      tag: "person",
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    },
    {
      _id: "61f7fdefc70715375b5ed6262",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "my title",
      description: "plz wake",
      tag: "person",
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    },
    {
      _id: "61f7fdefc70715375b5ed6162",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "my title",
      description: "plz wake",
      tag: "person",
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // add a note

  const addNote = (title, description, tag) => {
    note = {
      _id: "61f7fdefc70715375b5ed6362",
      user: "61f02cc1da4cfc96f38b3e0f",
      title: "my title",
      description: "plz wake",
      tag: "person",
      date: "2022-01-31T15:19:11.268Z",
      __v: 0,
    };

    setNotes(notes.push(note));
  };

  // delete a note

  const deleteNote = () => {};

  // edit a note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
