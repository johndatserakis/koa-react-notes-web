const userReducer = (state = '', { type, payload }) => {
    switch (type) {
        case 'updateUser':
            return payload
        default:
            return state
    }
}

export default userReducer