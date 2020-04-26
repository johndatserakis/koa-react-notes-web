import jwtDecode from "jwt-decode";
import { parseAxiosError } from "@/common/api";
import {
  login as userLogin,
  signup as userSignup,
  forgot as userForgot,
  reset as userReset,
} from "@/store/user/api-requests";
import {
  UserLoginPost,
  UserSignupPost,
  UserForgotPost,
  UserResetPost,
} from "@/store/user/api-types";
import { UserTokens, JwtDecodeData } from "@/store/user/types";
import { setUser, clearUser } from "@/store/user/actions-store";
import { ThunkResult, GeneralThunkDispatch } from "..";

export const login = (
  data: UserLoginPost,
): ThunkResult<Promise<UserTokens>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  try {
    // Authenticate user using creds
    const result = await userLogin(data);

    // Take the accessToken and decode it, giving the user
    const decoded: JwtDecodeData = jwtDecode(result.accessToken);
    dispatch(setUser(decoded.data));

    // Store the accessTokena and refreshToken in localStorage
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const signup = (
  data: UserSignupPost,
): ThunkResult<Promise<number>> => async () => {
  try {
    const result = userSignup(data);
    return result;
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const forgot = (
  data: UserForgotPost,
): ThunkResult<Promise<string>> => async () => {
  try {
    const result = userForgot(data);
    return result;
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
    userReset(data);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(parseAxiosError(error));
  }
};

export const logout = (): ThunkResult<Promise<void>> => async (
  dispatch: GeneralThunkDispatch,
) => {
  dispatch(clearUser());
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return Promise.resolve();
};
