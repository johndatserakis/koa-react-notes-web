import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { RootState } from "@/store";

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserShort = {
  id: number;
  token: string;
  username: string;
  email: string;
};

export type UserState = {
  user: UserShort;
};

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

type SetUserAction = {
  type: typeof SET_USER;
  payload: UserShort;
};

type ClearUser = {
  type: typeof CLEAR_USER;
};

export type UserActionTypes = SetUserAction | ClearUser;

export type JwtDecodeData = {
  data: UserShort;
  iat: number;
  exp: number;
};

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
