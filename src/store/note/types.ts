import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { RootState } from "@/store";

export interface Note {
  id: number;
  userId: number;
  title: string;
  content: string;
  ipAddress?: string;
  updatedAt?: string;
  createdAt: string;
}

export interface NotesQuery {
  sort: string;
  order: "desc" | "asc";
  page: number;
  limit: number;
}

export type NoteState = {
  notes: Note[];
  okToLoadMore: boolean;
  query: NotesQuery;
};

export const SET_NOTES = "SET_NOTES";
export const ADD_NOTES = "ADD_NOTES";
export const ADD_NOTE_TO_STACK = "ADD_NOTE_TO_STACK";
export const DELETE_NOTE_FROM_STACK = "DELETE_NOTE_FROM_STACK";
export const EDIT_NOTE_IN_STACK = "EDIT_NOTE_IN_STACK";
export const CLEAR_NOTES = "CLEAR_NOTES";
export const SET_OK_TO_LOAD_MORE = "SET_OK_TO_LOAD_MORE";
export const SET_QUERY = "SET_QUERY";

interface SetNotesAction {
  type: typeof SET_NOTES;
  payload: Note[];
}

interface AddNotesAction {
  type: typeof ADD_NOTES;
  payload: Note[];
}

interface AddNoteToStackAction {
  type: typeof ADD_NOTE_TO_STACK;
  payload: Note;
}

interface DeleteNoteFromStackAction {
  type: typeof DELETE_NOTE_FROM_STACK;
  payload: Note;
}

interface EditNoteInStackAction {
  type: typeof EDIT_NOTE_IN_STACK;
  payload: Note;
}

interface ClearNotesAction {
  type: typeof CLEAR_NOTES;
}

interface SetOkToLoadMore {
  type: typeof SET_OK_TO_LOAD_MORE;
  payload: boolean;
}

interface SetQuery {
  type: typeof SET_QUERY;
  payload: NotesQuery;
}

export type NoteActionTypes =
  | SetNotesAction
  | AddNotesAction
  | AddNoteToStackAction
  | DeleteNoteFromStackAction
  | EditNoteInStackAction
  | ClearNotesAction
  | SetOkToLoadMore
  | SetQuery;

export type NoteThunkDispatch = ThunkDispatch<
  RootState,
  undefined,
  NoteActionTypes
>;

export type NoteThunkResult<Result> = ThunkAction<
  Result,
  RootState,
  undefined,
  NoteActionTypes
>;
