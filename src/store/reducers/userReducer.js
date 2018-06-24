const userReducer = (state = {user: null, accessToken: null, refreshToken: null}, action) => {
    switch (action.type) {
        case 'user:setUser':
            return {
                ...state,
                user: action.payload
            }
        case 'user:setAccessToken':
            return {
                ...state,
                accessToken: action.payload
            }
        case 'user:setRefreshToken':
            return {
                ...state,
                refreshToken: action.payload
            }
        default:
            return state
    }
}

export default userReducer