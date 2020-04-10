import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { App } from "./App";
import { store } from "./store";

// const AppToast = ({ appearance, children }) => (
//   <div style={{ background: appearance === 'error' ? 'red' : 'green' }}>
//     {children}
//   </div>
// );

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById("root"),
);
