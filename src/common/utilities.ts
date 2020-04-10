import { AxiosStatic } from "axios";

export function setAuthorizationHeader(
  axios: AxiosStatic,
  accessToken: string,
) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}
