import { ThunkResult } from "@/store";
import { UserThunkDispatch, UserTokens } from "@/store/user/types";
import { getNewUserTokens, setUserAndTokens } from "@/store/user/actions";
import { AxiosError } from "axios";
import axios from "@/common/axios";

export const runAxiosAuthInterceptor = (): ThunkResult<Promise<void>> => async (
  dispatch: UserThunkDispatch,
  getState,
) => {
  // Get new tokens specifically for interceptor
  let userTokens: UserTokens | null = null;
  const getNewUserTokensForInterceptor = () => async (
    dispatch1: UserThunkDispatch,
  ) => {
    if (userTokens === null) {
      userTokens = await dispatch1(getNewUserTokens());
    }
    return userTokens;
  };

  // The actual interceptor
  axios.interceptors.response.use(undefined, async (error: AxiosError) => {
    if (!error || !error.response) {
      return;
    }

    if (
      error.response.status === 401 &&
      error.response.data.message === "TOKEN_EXPIRED" &&
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      !error.config.__isRetryRequest
    ) {
      try {
        const response = await dispatch(getNewUserTokensForInterceptor());
        if (response != null) {
          await dispatch(
            setUserAndTokens({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            }),
          );
          const { user } = getState();
          error.config.headers.Authorization = `Bearer ${user.userTokens.accessToken}`;
        }

        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        error.config.__isRetryRequest = true;

        // error.config.baseURL needs to be zeroed out to prevent tripping over
        // the baseURL we set in our main axios instance
        // error.config.baseURL = "";

        return axios(error.config);
      } catch (error1) {
        // TODO: Logout of program here...
        return Promise.reject(error1);
      }
    }

    // This is for a user that isn't logged in correctly
    if (
      error.response.status === 401 &&
      error.response.data.message === "AUTHENTICATION_ERROR"
    ) {
      // TODO: Logout of program here...
      return Promise.reject(error);
    }

    // This is for a user that isn't logged in correctly
    if (
      error.response.status === 401 &&
      error.response.data.message === "INVALID_REFRESH_TOKEN"
    ) {
      // TODO: Logout of program here...
      return Promise.reject(error);
    }

    // If someone gets here we don't want to log them out, because it's
    // more of a general error
    return Promise.reject(error);
  });
};
