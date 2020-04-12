// import jwtDecode from "jwt-decode";
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
import { NotesQuery } from "./api";

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
): ThunkResult<Promise<Note[]>> => async (
  dispatch: GeneralThunkDispatch,
  getState,
) => {
  try {
    const { user } = getState();
    setAuthorizationHeader(axios, user.userTokens.accessToken);
    const result: AxiosResponse<Note[]> = await axios.get("notes", {
      params: data,
    });
    dispatch(setNotes(result.data));
    return result.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
