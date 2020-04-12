import {
  NoteState,
  SET_NOTES,
  ADD_NOTES,
  ADD_NOTE_TO_STACK,
  DELETE_NOTE_FROM_STACK,
  EDIT_NOTE_IN_STACK,
  CLEAR_NOTES,
  NoteActionTypes,
} from "./types";

const initialState: NoteState = {
  notes: [],
};

export const noteReducer = (
  state = initialState,
  action: NoteActionTypes,
): NoteState => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTES:
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
      };
    case ADD_NOTE_TO_STACK:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case DELETE_NOTE_FROM_STACK: {
      const index = state.notes
        .map((note) => note.id)
        .indexOf(action.payload.id);
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, index),
          ...state.notes.slice(index + 1),
        ],
      };
    }
    case EDIT_NOTE_IN_STACK: {
      const index = state.notes
        .map((note) => note.id)
        .indexOf(action.payload.id);
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, index),
          // The next line would be {...note, title: action.payload} if we were
          // just updating 1 property on the object
          action.payload,
          ...state.notes.slice(index + 1),
        ],
      };
    }
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
};
