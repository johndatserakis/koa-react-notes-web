import { UserState } from "../types/user";

const initialState: UserState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
}

const userReducer = (state = initialState, action: any) => {
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
