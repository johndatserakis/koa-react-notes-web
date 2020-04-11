import * as Yup from "yup";

export interface UserLoginPost {
  username: string;
  password: string;
}

export const UserLoginValidation = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 6 characters"),
});
