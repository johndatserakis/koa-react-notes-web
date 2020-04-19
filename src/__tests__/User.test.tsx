import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { configureStore } from "@/store";
import { Login } from "@/components/user/components/Login";
import { Signup } from "@/components/user/components/Signup";
import { Forgot } from "@/components/user/components/Forgot";
import { Reset } from "@/components/user/components/Reset";
import { MemoryRouter } from "react-router-dom";

test("Loads Login", () => {
  const { getByLabelText } = render(
    <Provider store={configureStore()}>
      <ToastProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </ToastProvider>
    </Provider>,
  );

  expect(getByLabelText(/Username/i)).toBeInTheDocument();
  expect(getByLabelText(/Password/i)).toBeInTheDocument();
});

test("Loads Signup", () => {
  const { getByLabelText } = render(
    <Provider store={configureStore()}>
      <ToastProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </ToastProvider>
    </Provider>,
  );

  expect(getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(getByLabelText(/Username/i)).toBeInTheDocument();
  expect(getByLabelText(/Email/i)).toBeInTheDocument();
  expect(getByLabelText(/Confirm Password/i)).toBeInTheDocument();
});

test("Loads Forgot", () => {
  const { getByLabelText } = render(
    <Provider store={configureStore()}>
      <ToastProvider>
        <MemoryRouter>
          <Forgot />
        </MemoryRouter>
      </ToastProvider>
    </Provider>,
  );

  expect(getByLabelText(/Email/i)).toBeInTheDocument();
});

test("Loads Reset", () => {
  const { getByLabelText } = render(
    <Provider store={configureStore()}>
      <ToastProvider>
        <MemoryRouter>
          <Reset />
        </MemoryRouter>
      </ToastProvider>
    </Provider>,
  );

  expect(getByLabelText(/Confirm Password/i)).toBeInTheDocument();
});
