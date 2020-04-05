import axios from "axios";

function setAuthorizationHeader(accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export { setAuthorizationHeader };
