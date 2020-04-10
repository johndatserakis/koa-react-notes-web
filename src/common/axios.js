// In a `try/catch`` errors you'll need to
// `return Promise.reject(error.response)` in the `catch` portion
// to allow the error to show through
// https://github.com/axios/axios/issues/960#issuecomment-320659373

import axios from "axios";

// If using the local external option when serving the frontend,
// you need to provide the base url the external serving provides.
const defaultOptions = {
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
};

// Create instance
const instance = axios.create(defaultOptions);

// eslint-disable-next-line import/no-default-export
export default instance;
