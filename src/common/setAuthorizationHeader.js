import axios from 'common/axios'

const setAuthorizationHeader = (accessToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    return
}

export default setAuthorizationHeader
