import axios from 'common/axios'
// import setAuthorizationHeader from 'common/setAuthorizationHeader'
import jwtDecode from 'jwt-decode'

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

// Helpers
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