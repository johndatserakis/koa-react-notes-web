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
  userTokens: UserTokens;
};

export const SET_USER_AND_TOKENS = "SET_USER_AND_TOKENS";
export const SET_USER = "SET_USER";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserShort;
}

interface SetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  payload: UserTokens["accessToken"];
}

interface SetRefreshTokenAction {
  type: typeof SET_REFRESH_TOKEN;
  payload: UserTokens["refreshToken"];
}

export type UserActionTypes =
  | SetUserAction
  | SetAccessTokenAction
  | SetRefreshTokenAction;

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
