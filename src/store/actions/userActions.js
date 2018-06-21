import axios from 'common/axios'

export const UPDATE_USER = 'users:updateUser';

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: {
            user: user
        }
    }
}

export const userActionLogin = (data) => {
    return async dispatch => {
        try {
            let result = await axios.post('user/authenticate', data)
            console.log(result)
        } catch (error) {
            throw new Error(error)
        }
    }
}