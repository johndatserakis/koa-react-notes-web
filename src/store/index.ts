import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer } from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
