import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import ErrorBoundary from "react-error-boundary";
import { ErrorBoundaryComponent } from "@/components/layouts/main/ErrorBoundary";
import { App } from "./App";
import { configureStore } from "./store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
      <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
        <App />
      </ErrorBoundary>
    </ToastProvider>
  </Provider>,
  document.getElementById("root"),
);
