import process from "process";

export const isDev = () => {
  // If there's no NODE_ENV default to dev for safety
  if (!process.env.NODE_ENV) {
    return true;
  }

  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "test"
  ) {
    return false;
  }

  return true;
};
