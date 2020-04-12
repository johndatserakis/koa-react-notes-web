import jwtDecode from "jwt-decode";
import axios, { setAuthorizationHeader } from "@/common/axios";
import { AxiosResponse } from "axios";
import { ThunkResult, GeneralThunkDispatch } from "@/store";
import { parseAxiosError } from "@/common/api";
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

export const setAccessToken = (accessToken: string) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  };
};

export const setRefreshToken = (refreshToken: string) => {
  return {
    type: SET_REFRESH_TOKEN,
    payload: refreshToken,
  };
};

export const setUserAndTokens = (
  data: UserTokens,
): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch,
  getState, // eslint-disable-line no-unused-vars
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
    return Promise.reject(parseAxiosError(error));
  }
};

export const login = (
  data: UserLoginPost,
): ThunkResult<Promise<UserTokens>> => async (
  dispatch: UserThunkDispatch,
  getState, // eslint-disable-line no-unused-vars
) => {
  try {
    const result: AxiosResponse<UserTokens> = await axios.post(
      "user/authenticate",
      data,
    );
    await dispatch(setUserAndTokens(result.data));
    return result.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

//

export const getNewUserTokens = (): ThunkResult<Promise<UserTokens>> => async (
  dispatch: UserThunkDispatch,
  getState,
) => {
  try {
    const { user } = getState();
    setAuthorizationHeader(axios, user.userTokens.accessToken);
    const result: AxiosResponse<UserTokens> = await axios.post(
      "user/refreshAccessToken",
      {
        username: user.user.username,
        refreshToken: user.userTokens.refreshToken,
      },
    );
    return result.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};
