import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { App } from "./App";
import { configureStore } from "./store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById("root"),
);
