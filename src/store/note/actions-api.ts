import { parseAxiosError } from "@/common/api";
import {
  addNotes,
  addNoteToStack,
  editNoteInStack,
  deleteNoteFromStack,
} from "@/store/note/actions-store";
import { NotesQuery, NoteCreatePost } from "@/store/note/api-types";
import { Note } from "@/store/note/types";
import { all, create, find, update, del } from "@/store/note/api-requests";
import { ThunkResult, GeneralThunkDispatch } from "@/store";

export const getNotes = (
  data: NotesQuery,
): ThunkResult<Promise<Note[]>> => async (dispatch: GeneralThunkDispatch) => {
  try {
    const result = await all(data);
    dispatch(addNotes(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const getNote = (
  data: number,
): ThunkResult<Promise<Note>> => async () => {
  try {
    const result = await find(data);
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const createNote = (
  data: NoteCreatePost,
): ThunkResult<Promise<Note>> => async (dispatch: GeneralThunkDispatch) => {
  try {
    const result = await create(data);
    dispatch(addNoteToStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const updateNote = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await update(data);
    dispatch(editNoteInStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const deleteNote = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await del(data);
    dispatch(deleteNoteFromStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
