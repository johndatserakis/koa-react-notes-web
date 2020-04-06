import React from "react";
import {
  Formik, Form,
} from "formik";
import * as Yup from "yup";
import { TextInput, SubmitButton } from "@/components/Partials/Forms/Inputs/Inputs";

interface LoginForm {
  username: string;
  password: string;
}

const defaultValues: LoginForm = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required")
    .min(8, "Password must be at least 6 characters"),
});

// And now we can use these
export const LoginForm = () => {
  const handleSubmit = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <h1>Login</h1>
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <TextInput
                name="username"
                type="text"
                label="Username (Email)"
              />
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <TextInput
                name="password"
                type="password"
                label="Password"
              />
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <SubmitButton
                name="login-submit-button"
                text="Login"
                loading={false}
                loadingText="Logging in ..."
              />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
