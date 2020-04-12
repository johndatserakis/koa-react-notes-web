// import { ThunkResult } from "@/store";
// import { UserThunkDispatch, UserTokens } from "@/store/user/types";
// import { getNewUserTokens, setUserAndTokens } from "@/store/user/actions";
// import { AxiosError } from "axios";
// import axios from "@/common/axios";
// import { parseAxiosError } from "../api";

// // Get new tokens specifically for interceptor
// let userTokens: UserTokens | null = null;
// const getNewUserTokensForInterceptor = () => async (
//   dispatch: UserThunkDispatch,
// ) => {
//   try {
//     if (userTokens === null) {
//       userTokens = await dispatch(getNewUserTokens());
//       userTokens = null;
//     }
//     return userTokens;
//   } catch (error) {
//     console.log("getNewUserTokensForInterceptor error", error);
//     return Promise.reject();
//   }
// };

// export const runAxiosAuthInterceptor = (): ThunkResult<Promise<void>> => async (
//   dispatch: UserThunkDispatch,
//   getState,
// ) => {
//   // The actual interceptor
//   axios.interceptors.response.use(undefined, async (error: AxiosError) => {
//     // @ts-ignore
//     // eslint-disable-next-line no-underscore-dangle
//     console.log("__isRetryRequest", error.config.__isRetryRequest);
//     if (
//       error &&
//       error.response &&
//       error.response.status === 401 &&
//       error.response.data.message === "TOKEN_EXPIRED" &&
//       // @ts-ignore
//       // eslint-disable-next-line no-underscore-dangle
//       !error.config.__isRetryRequest
//     ) {
//       console.log("axios interceptor", "after initial checks");
//       try {
//         const response = await dispatch(getNewUserTokensForInterceptor());
//         console.log("right after getNewUserTokensForInterceptor", response);
//         if (response != null) {
//           console.log("interceptor at", response);

//           await dispatch(
//             setUserAndTokens({
//               accessToken: response.accessToken,
//               refreshToken: response.refreshToken,
//             }),
//           );

//           // Use the newly fetched refreshToken...
//           error.config.headers.Authorization = `Bearer ${response.refreshToken}`;
//         }

//         // @ts-ignore
//         // eslint-disable-next-line no-underscore-dangle
//         error.config.__isRetryRequest = true;

//         // error.config.baseURL needs to be zeroed out to prevent tripping over
//         // the baseURL we set in our main axios instance
//         // error.config.baseURL = "";

//         return axios(error.config);
//       } catch (error1) {
//         // TODO: Logout of program here...
//         return Promise.reject(parseAxiosError(error));
//       }
//     }

//     // This is for a user that isn't logged in correctly
//     if (
//       error &&
//       error.response &&
//       error.response.status === 401 &&
//       error.response.data.message === "AUTHENTICATION_ERROR"
//     ) {
//       // TODO: Logout of program here...
//       return Promise.reject(parseAxiosError(error));
//     }

//     // This is for a user that isn't logged in correctly
//     if (
//       error &&
//       error.response &&
//       error.response.status === 401 &&
//       error.response.data.message === "INVALID_REFRESH_TOKEN"
//     ) {
//       // TODO: Logout of program here...
//       return Promise.reject(parseAxiosError(error));
//     }

//     // If someone gets here we don't want to log them out, because it's
//     // more of a general error
//     return Promise.reject(parseAxiosError(error));
//   });
// };

import axios from "@/common/axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Obtain the fresh token each time the function is called
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/user/refreshAccessToken`, {
      username: "demousername",
      refreshToken: getRefreshToken(),
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem(
        "accessToken",
        tokenRefreshResponse.data.accessToken,
      );
      localStorage.setItem(
        "refreshToken",
        tokenRefreshResponse.data.refreshToken,
      );
      failedRequest.response.config.headers.Authorization = `Bearer ${getAccessToken()}`;
      return Promise.resolve();
    });

export const runAxiosAuthInterceptor = () => {
  // Instantiate the interceptor (you can chain it as it returns the axios instance)
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
};
