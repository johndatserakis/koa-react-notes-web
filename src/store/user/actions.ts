import jwtDecode from "jwt-decode";
import axios from "@/common/axios";
import { AxiosResponse } from "axios";
import { ThunkResult, GeneralThunkDispatch } from "@/store";
import { parseAxiosError } from "@/common/api";
import {
  UserLoginPost,
  UserSignupPost,
  UserForgotPost,
  UserResetPost,
} from "./api";
import {
  UserShort,
  SET_USER,
  JwtDecodeData,
  CLEAR_USER,
  UserTokens,
} from "./types";

export const setUser = (user: UserShort) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const login = (
  data: UserLoginPost,
): ThunkResult<Promise<UserTokens>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    // Authenticate user using creds
    const result: AxiosResponse<{
      data: {
        accessToken: UserTokens["accessToken"];
        refreshToken: UserTokens["refreshToken"];
      };
    }> = await axios.post("user/authenticate", data);

    // Take the accessToken and decode it, giving the user
    const decoded: JwtDecodeData = jwtDecode(result.data.data.accessToken);
    dispatch(setUser(decoded.data));

    // Store the accessTokena and refreshToken in localStorage
    localStorage.setItem("accessToken", result.data.data.accessToken);
    localStorage.setItem("refreshToken", result.data.data.refreshToken);

    return result.data.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const signup = (
  data: UserSignupPost,
): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch, // eslint-disable-line no-unused-vars
) => {
  try {
    const result: AxiosResponse = await axios.post("user/signup", data);
    return result.data.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const forgot = (
  data: UserForgotPost,
): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch, // eslint-disable-line no-unused-vars
) => {
  try {
    const result: AxiosResponse = await axios.post("user/forgot", data);
    return result.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const reset = (
  data: UserResetPost,
): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch, // eslint-disable-line no-unused-vars
) => {
  try {
    const result: AxiosResponse = await axios.post("user/resetPassword", data);
    return result.data;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

//

export const logout = (): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  dispatch(clearUser());
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return Promise.resolve();
};
