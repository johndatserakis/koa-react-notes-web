import axios from "@/common/axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const tokens = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/refreshAccessToken`,
      {
        username: "demousername",
        refreshToken: getRefreshToken(),
      },
    );

    localStorage.setItem("accessToken", tokens.data.accessToken);
    localStorage.setItem("refreshToken", tokens.data.refreshToken);
    failedRequest.response.config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return Promise.resolve();
  } catch (error) {
    Promise.reject();
  }
};

export const runAxiosAuthInterceptor = () => {
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
};
