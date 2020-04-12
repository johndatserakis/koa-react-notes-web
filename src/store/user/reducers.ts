import { UserState, SET_USER, UserActionTypes, CLEAR_USER } from "./types";

const initialState: UserState = {
  user: {
    id: 0,
    token: "",
    username: "",
    email: "",
  },
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
