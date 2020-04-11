import jwtDecode from "jwt-decode";
import axios from "@/common/axios";
import { AxiosResponse } from "axios";
import { ThunkResult, GeneralThunkDispatch } from "@/store";
import { UserLoginPost } from "./api";
import {
  UserShort,
  UserTokens,
  SET_USER,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  JwtDecodeData,
  UserThunkDispatch,
} from "./types";

export const setUser = (user: UserShort) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAccessToken = (accessToken: UserTokens["accessToken"]) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
  };
};

export const setRefreshToken = (refreshToken: UserTokens["refreshToken"]) => {
  return {
    type: SET_REFRESH_TOKEN,
    payload: { refreshToken },
  };
};

export const setUserAndTokens = (
  data: UserTokens,
): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch,
  getState,
) => {
  try {
    const decoded: JwtDecodeData = jwtDecode(data.accessToken);
    dispatch(setUser(decoded.data));
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return Promise.resolve();
  } catch (error) {
    // throw new Error(error);
    return Promise.reject();
  }
};

export const login = (
  data: UserLoginPost,
): ThunkResult<Promise<UserTokens>> => async (
  dispatch: UserThunkDispatch,
  getState,
) => {
  try {
    const result: AxiosResponse<UserTokens> = await axios.post(
      "user/authenticate",
      data,
    );
    await dispatch(setUserAndTokens(result.data));
    // return Promise.resolve(result.data);
    return result.data;
  } catch (error) {
    // Read here
    // https://github.com/axios/axios#handling-errors
    // throw new Error(error.response.data.message);
    return Promise.reject(
      error.response ? error.response : error.data.error.message,
    );
  }
};
