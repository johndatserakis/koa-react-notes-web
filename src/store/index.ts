import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducer as counterReducer } from "./counterSlice";
import { reducer as userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;
export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
