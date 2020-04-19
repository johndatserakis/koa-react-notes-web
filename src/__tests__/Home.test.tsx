import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { configureStore } from "@/store";
import { App } from "@/App";

test("Loads App", () => {
  const { getByText } = render(
    <Provider store={configureStore()}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>,
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
});
