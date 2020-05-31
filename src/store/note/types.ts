import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { RootState } from "@/store";

export type Note = {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly content: string;
  readonly ipAddress?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
};

export type NotesQuery = {
  readonly sort: string;
  readonly order: "desc" | "asc";
  readonly page: number;
  readonly limit: number;
};

export type NoteState = {
  readonly notes: readonly Note[];
  readonly okToLoadMore: boolean;
  readonly query: NotesQuery;
};

export const SET_NOTES = "SET_NOTES";
export const ADD_NOTES = "ADD_NOTES";
export const ADD_NOTE_TO_STACK = "ADD_NOTE_TO_STACK";
export const DELETE_NOTE_FROM_STACK = "DELETE_NOTE_FROM_STACK";
export const EDIT_NOTE_IN_STACK = "EDIT_NOTE_IN_STACK";
export const CLEAR_NOTES = "CLEAR_NOTES";
export const SET_OK_TO_LOAD_MORE = "SET_OK_TO_LOAD_MORE";
export const SET_QUERY = "SET_QUERY";

type SetNotesAction = {
  readonly type: typeof SET_NOTES;
  readonly payload: readonly Note[];
};

type AddNotesAction = {
  readonly type: typeof ADD_NOTES;
  readonly payload: readonly Note[];
};

type AddNoteToStackAction = {
  readonly type: typeof ADD_NOTE_TO_STACK;
  readonly payload: Note;
};

type DeleteNoteFromStackAction = {
  readonly type: typeof DELETE_NOTE_FROM_STACK;
  readonly payload: Note;
};

type EditNoteInStackAction = {
  readonly type: typeof EDIT_NOTE_IN_STACK;
  readonly payload: Note;
};

type ClearNotesAction = {
  readonly type: typeof CLEAR_NOTES;
};

type SetOkToLoadMore = {
  readonly type: typeof SET_OK_TO_LOAD_MORE;
  readonly payload: boolean;
};

type SetQuery = {
  readonly type: typeof SET_QUERY;
  readonly payload: NotesQuery;
};

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
