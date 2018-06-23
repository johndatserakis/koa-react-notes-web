import axios from 'common/axios'

function setAuthorizationHeader (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    return
}

export { setAuthorizationHeader }
