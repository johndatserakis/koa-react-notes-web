import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
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
