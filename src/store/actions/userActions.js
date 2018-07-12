import axios from 'common/axios'
import setAuthorizationHeader from 'common/setAuthorizationHeader'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'

import store from 'store' // only use for axios interceptors
import { notesLogout } from 'store/actions/notesActions' // only use for axios interceptors logout
import history from 'router/history' // only use for axios interceptors logout

export const SET_USER_AND_TOKENS = 'user:setUserAndTokens'
export const SET_USER = 'user:setUser'
export const SET_ACCESS_TOKEN = 'user:setAccessToken'
export const SET_REFRESH_TOKEN = 'user:setRefreshToken'

// Mutations
export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: { user: user }
    }
}

export const setAccessToken = (accessToken) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: { accessToken: accessToken  }
    }
}

export const setRefreshToken = (refreshToken) => {
    return {
        type: SET_REFRESH_TOKEN,
        payload: { refreshToken: refreshToken  }
    }
}

// Pure Actions
export const setUserAndTokens = (data) => {
    return async dispatch => {
        try {
            let decoded = jwtDecode(data.accessToken)
            await dispatch({ type: SET_USER, payload: decoded.data})
            await dispatch({ type: SET_ACCESS_TOKEN, payload: data.accessToken})
            await dispatch({ type: SET_REFRESH_TOKEN, payload: data.refreshToken})

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            return Promise.resolve()
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const userLogout = () => {
    return async dispatch => {
        try {
            await dispatch({ type: SET_USER, payload: null})
            await dispatch({ type: SET_ACCESS_TOKEN, payload: null})
            await dispatch({ type: SET_REFRESH_TOKEN, payload: null})

            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            return Promise.resolve()
        } catch (error) {
            throw new Error(error)
        }
    }
}

// API Calls
export const userActionLogin = (data) => {
    return async dispatch => {
        try {
            let result = await axios.post('user/authenticate', data)
            await dispatch(setUserAndTokens(result.data))
            return Promise.resolve()
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

export const userActionSignup = (data) => {
    return async dispatch => {
        try {
            await axios.post('user/signup', data)
            return Promise.resolve()
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

export const userActionForgot = (data) => {
    return async dispatch => {
        try {
            await axios.post('user/forgot', data)
            return Promise.resolve()
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

export const userActionReset = (data) => {
    return async dispatch => {
        try {
            await axios.post('user/resetPassword', data)
            return Promise.resolve()
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message)
        }
    }
}

export const refreshUserTokens = (data) => {
    return async (dispatch, getState) => {
        try {
            setAuthorizationHeader(getState().user.accessToken)
            return await axios.post('user/refreshAccessToken', {
                username: getState().user.user.username,
                refreshToken: getState().user.refreshToken
            })
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

// Below: Axios interceptors in the case of an expired token.

// In the case of multiple api calls needing to be refreshed
// https://github.com/axios/axios/issues/450#issuecomment-247446276
let authTokenRequest
async function getAuthToken () {
    if (!authTokenRequest) {
        authTokenRequest = store.dispatch(refreshUserTokens())
        authTokenRequest.then(() => {
            authTokenRequest = null
        }).catch(() => {
            authTokenRequest = null
        })
    }
    return authTokenRequest
}

async function logoutOfProgram () {
    // All stores must logout here
    await store.dispatch(userLogout())
    await store.dispatch(notesLogout())

    toast.error('There was an error authenticating your session. Please login again.')

    history.push('/')
}

axios.interceptors.response.use(undefined, async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED' && !error.config.__isRetryRequest) {
        try {
            let response = await getAuthToken()
            await store.dispatch(setUserAndTokens({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}))
            error.config.headers['Authorization'] = 'Bearer ' + store.getState().user.accessToken
            error.config.__isRetryRequest = true
            return axios(error.config)
        } catch (error) {
            console.log('1')
            logoutOfProgram()
            return Promise.reject(error)
        }
    }

    // This is for a user that isn't logged in correctly
    if (error.response.status === 401 && error.response.data.message === 'AUTHENTICATION_ERROR') {
        // console.log('2')
        logoutOfProgram()
        return Promise.reject(error)
    }

    // This is for a user that isn't logged in correctly
    if (error.response.status === 401 && error.response.data.message === 'INVALID_REFRESH_TOKEN') {
        // console.log('3')
        logoutOfProgram()
        return Promise.reject(error)
    }

    // If someone gets here we don't want to log them out, because it's
    // more of a general error
    return Promise.reject(error)
})