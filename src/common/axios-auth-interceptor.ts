import axios from "@/common/axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { UserTokens } from "@/store/user/types";
import { AxiosResponse } from "axios";

const getToken = (type: "accessToken" | "refreshToken") =>
  localStorage.getItem(type);

const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const tokens: AxiosResponse<{
      data: {
        accessToken: UserTokens["accessToken"];
        refreshToken: UserTokens["refreshToken"];
      };
    }> = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/refreshAccessToken`,
      {
        username: "demousername",
        refreshToken: getToken("refreshToken"),
      },
    );

    localStorage.setItem("accessToken", tokens.data.data.accessToken);
    localStorage.setItem("refreshToken", tokens.data.data.refreshToken);
    failedRequest.response.config.headers.Authorization = `Bearer ${getToken(
      "accessToken",
    )}`;
    return Promise.resolve();
  } catch (error) {
    Promise.reject();
  }
};

export const runAxiosAuthInterceptor = () => {
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
};
