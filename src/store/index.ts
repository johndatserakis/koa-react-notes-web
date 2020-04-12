import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "@/store/user/reducers";
import { noteReducer } from "./note/reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  note: noteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer),
  );

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;

// Async thunk helpers
// https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-603392173

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;
export type GeneralThunkDispatch = ThunkDispatch<RootState, undefined, Action>;
