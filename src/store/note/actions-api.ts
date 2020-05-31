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
  all as apiAll,
  create as apiCreate,
  find as apiFind,
  update as apiUpdate,
  del as apiDel,
} from "@/store/note/api-requests";
import { ThunkResult, GeneralThunkDispatch } from "@/store";

export const all = (
  data: NotesQuery,
): ThunkResult<Promise<readonly Note[]>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await apiAll(data);
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
    const result = await apiCreate(data);
    dispatch(addNoteToStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const find = (data: number): ThunkResult<Promise<Note>> => async () => {
  try {
    const result = await apiFind(data);
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const update = (data: Note): ThunkResult<Promise<Note>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    const result = await apiUpdate(data);
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
    const result = await apiDel(data);
    dispatch(deleteNoteFromStack(result));
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
