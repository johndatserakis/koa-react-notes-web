import {
  Note,
  NotesQuery,
  SET_NOTES,
  ADD_NOTES,
  ADD_NOTE_TO_STACK,
  DELETE_NOTE_FROM_STACK,
  EDIT_NOTE_IN_STACK,
  CLEAR_NOTES,
  SET_OK_TO_LOAD_MORE,
  SET_QUERY,
} from "@/store/note/types";

export const setNotes = (notes: readonly Note[]) => {
  return {
    type: SET_NOTES,
    payload: notes,
  };
};

export const addNotes = (notes: readonly Note[]) => {
  return {
    type: ADD_NOTES,
    payload: notes,
  };
};

export const addNoteToStack = (note: Note) => {
  return {
    type: ADD_NOTE_TO_STACK,
    payload: note,
  };
};

export const deleteNoteFromStack = (note: Note) => {
  return {
    type: DELETE_NOTE_FROM_STACK,
    payload: note,
  };
};

export const editNoteInStack = (note: Note) => {
  return {
    type: EDIT_NOTE_IN_STACK,
    payload: note,
  };
};

export const clearNotes = () => {
  return {
    type: CLEAR_NOTES,
  };
};

export const setOkToLoadMore = (value: boolean) => {
  return {
    type: SET_OK_TO_LOAD_MORE,
    payload: value,
  };
};

export const setQuery = (value: NotesQuery) => {
  return {
    type: SET_QUERY,
    payload: value,
  };
};
