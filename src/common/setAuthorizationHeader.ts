import axios from 'common/axios'

const setAuthorizationHeader = (accessToken: string): void => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
}

export default setAuthorizationHeader
