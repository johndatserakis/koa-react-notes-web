/* eslint-disable no-unused-vars */
import {
  createSlice,
  PayloadAction,
  Slice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "@/store";
import jwtDecode from "jwt-decode";
import axios from "@/common/axios";
import { AxiosResponse } from "axios";
// import { setAxiosAuthorizationHeader } from "@/common/utilities";

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Note {
  id: number;
  userId: number;
  title: string;
  content: string;
  ipAddress: string;
  updatedAt?: string;
  createdAt: "2020-03-27T17:52:48.000Z";
}

export interface User {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpiration?: string;
  sendPromotionalEmails: boolean;
  isAdmin: boolean;
  isDeleted: boolean;
  loginCount: number;
  ipAddress: string;
  updatedAt: string;
  createdAt: string;
}

export interface UserShort {
  id: number;
  token: string;
  username: string;
  email: string;
}

export type UserState = {
  user?: UserShort;
  userTokens?: UserTokens;
};

const initialState: UserState = {
  user: {
    id: 0,
    token: "",
    username: "",
    email: "",
  },
  userTokens: {
    accessToken: "",
    refreshToken: "",
  },
};

export const slice: Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (
      state,
      action: PayloadAction<UserTokens["accessToken"]>,
    ) => {
      state.userTokens.accessToken = action.payload;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<UserTokens["refreshToken"]>,
    ) => {
      state.userTokens.accessToken = action.payload;
    },
  },
});

export const { setUser, setAccessToken, setRefreshToken } = slice.actions;

interface UserLoginPostData {
  username: string;
  password: string;
}

interface JwtDecodeData {
  data: UserShort;
  iat: number;
  exp: number;
}

export const setUserAndUserTokens = (data: UserTokens): AppThunk => (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  try {
    const decoded: JwtDecodeData = jwtDecode(data.accessToken);
    dispatch(setUser(decoded.data));
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.response ? error.response : error);
  }
};

export const userLogin = (data: UserLoginPostData): AppThunk => async (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  try {
    setTimeout(async () => {
      const result: AxiosResponse = await axios.post<UserTokens>(
        "user/authenticate",
        data,
      );
      await dispatch(setUserAndUserTokens(result.data));
    }, 5000);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.response ? error.response : error);
  }
};

export const user = (state: RootState) => state.user.user;
export const userTokens = (state: RootState) => state.user.userTokens;

export const { reducer } = slice;
