import { parseAxiosError } from "@/common/api";
import {
  addNotes,
  addNoteToStack,
  editNoteInStack,
  deleteNoteFromStack,
} from "@/store/note/actions-store";
import { NoteCreatePost } from "@/store/note/api-types";
import { Note, NotesQuery } from "@/store/note/types";
import {
  all as noteAll,
  create as noteCreate,
  find as noteFind,
  update as noteUpdate,
  del as noteDel,
} from "@/store/note/api-requests";
import { ThunkResult, GeneralThunkDispatch } from "@/store";

export const all = (data: NotesQuery): ThunkResult<Promise<Note[]>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await noteAll(data);
    dispatch(addNotes(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const create = (
  data: NoteCreatePost,
): ThunkResult<Promise<Note>> => async (dispatch: GeneralThunkDispatch) => {
  try {
    const result = await noteCreate(data);
    dispatch(addNoteToStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const find = (data: number): ThunkResult<Promise<Note>> => async () => {
  try {
    const result = await noteFind(data);
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const update = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await noteUpdate(data);
    dispatch(editNoteInStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const del = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await noteDel(data);
    dispatch(deleteNoteFromStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
