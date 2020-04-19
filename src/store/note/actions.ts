import axios, { setAuthorizationHeader } from "@/common/axios";
import { AxiosResponse } from "axios";
import { ThunkResult, GeneralThunkDispatch } from "@/store";
import { parseAxiosError } from "@/common/api";
import {
  Note,
  SET_NOTES,
  ADD_NOTES,
  ADD_NOTE_TO_STACK,
  DELETE_NOTE_FROM_STACK,
  EDIT_NOTE_IN_STACK,
  CLEAR_NOTES,
} from "./types";
import { NotesQuery, NoteCreatePost } from "./api";

export const setNotes = (notes: Note[]) => {
  return {
    type: SET_NOTES,
    payload: notes,
  };
};

export const addNotes = (notes: Note[]) => {
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

//

export const getNotes = (
  data: NotesQuery,
): ThunkResult<Promise<Note[]>> => async (dispatch: GeneralThunkDispatch) => {
  try {
    setAuthorizationHeader(axios);
    const result: AxiosResponse<{ data: { notes: Note[] } }> = await axios.get(
      "notes",
      {
        params: data,
      },
    );
    dispatch(addNotes(result.data.data.notes));
    return result.data.data.notes;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const getNote = (
  data: number,
): ThunkResult<Promise<Note>> => async () => {
  try {
    setAuthorizationHeader(axios);
    const result: AxiosResponse<{ data: { note: Note } }> = await axios.get(
      `notes/${data}`,
    );
    return result.data.data.note;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const createNote = (
  data: NoteCreatePost,
): ThunkResult<Promise<Note>> => async (dispatch: GeneralThunkDispatch) => {
  try {
    setAuthorizationHeader(axios);
    const result: AxiosResponse<{ data: { note: Note } }> = await axios.post(
      "notes",
      data,
    );
    dispatch(addNoteToStack(result.data.data.note));
    return result.data.data.note;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const updateNote = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    interface NotePutRequest {
      title: string;
      content: string;
    }

    const putRequest: NotePutRequest = {
      title: data.title,
      content: data.content,
    };

    setAuthorizationHeader(axios);
    const result: AxiosResponse<{ data: { note: Note } }> = await axios.put(
      `notes/${data.id}`,
      putRequest,
    );
    dispatch(editNoteInStack(result.data.data.note));
    return result.data.data.note;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const deleteNote = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    setAuthorizationHeader(axios);
    await axios.delete(`notes/${data.id}`);
    dispatch(deleteNoteFromStack(data));
    return data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
