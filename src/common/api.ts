import { AxiosError } from "axios";
import { isDev } from "./get-env";

type E = {
  readonly code: number;
  readonly message: string;
};

export type ServerError = {
  readonly error: E;
  readonly errors?: readonly E[];
};

export const parseAxiosError = (e: AxiosError): ServerError => {
  if (e.response) {
    return {
      error: {
        code: e.response.data.error.code || e.response.status,
        message: e.response.data.error.message,
      },
    };
  }

  return {
    error: {
      code: 500,
      message: isDev()
        ? e.message || "Internal Server Error"
        : "Internal Server Error",
    },
  };
};

export const parseGeneralError = (e: Error): ServerError => {
  if (e.message) {
    return {
      error: {
        code: 500,
        message: isDev() ? e.message : "Internal Server Error",
      },
    };
  }

  return {
    error: {
      code: 500,
      message: "Internal Server Error",
    },
  };
};

export type ApiResponse<T> = {
  readonly data: T;
};
