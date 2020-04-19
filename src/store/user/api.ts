import * as Yup from "yup";

export interface UserLoginPost {
  username: string;
  password: string;
}

export interface UserSignupPost {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSignupPostWithPasswordConfirm extends UserSignupPost {
  passwordConfirm: string;
}

export interface UserForgotPost {
  email: string;
  url: string;
  type: "web";
}

export interface UserResetPost {
  passwordResetToken: string;
  email: string;
  password: string;
}

export interface UserResetPostWithPasswordConfirm extends UserResetPost {
  passwordConfirm: string;
}

//

export const UserLoginPostValidation = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
});

export const UserSignupPostWithPasswordConfirmValidation = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
});

export const UserForgotPostValidation = Yup.object({
  email: Yup.string().required("Email is required").email(),
});

export const UserResetPostWithPasswordConfirmValidation = Yup.object({
  passwordResetToken: Yup.string().required("Required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
});
