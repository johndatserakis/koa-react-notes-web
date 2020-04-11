import {
  UserState,
  SET_USER,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  UserActionTypes,
} from "./types";

const initialState: UserState = {
  user: {
    id: 0,
    token: "",
    username: "",
    email: "",
  },
  userTokens: {
    accessToken: "",
    refreshToken: "",
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
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        userTokens: {
          ...state.userTokens,
          accessToken: action.payload,
        },
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        userTokens: {
          ...state.userTokens,
          refreshToken: action.payload,
        },
      };
    default:
      return state;
  }
};
