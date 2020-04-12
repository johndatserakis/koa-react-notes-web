import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { RootState } from "@/store";

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserShort {
  id: number;
  token: string;
  username: string;
  email: string;
}

export type UserState = {
  user: UserShort;
};

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserShort;
}

interface ClearUser {
  type: typeof CLEAR_USER;
}

export type UserActionTypes = SetUserAction | ClearUser;

export interface JwtDecodeData {
  data: UserShort;
  iat: number;
  exp: number;
}

export type UserThunkDispatch = ThunkDispatch<
  RootState,
  undefined,
  UserActionTypes
>;

export type UserThunkResult<Result> = ThunkAction<
  Result,
  RootState,
  undefined,
  UserActionTypes
>;
