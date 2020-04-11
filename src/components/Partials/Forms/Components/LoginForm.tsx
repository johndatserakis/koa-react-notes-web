import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import {
  TextInput,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
// import { useDispatch } from "react-redux";
import { useReduxDispatch } from "@/store";
import { useToasts } from "react-toast-notifications";
import {
  userLogin,
  UserLoginPost,
  UserLoginValidation,
} from "@/store/userSlice";

const defaultValues: UserLoginPost = {
  username: "demousername",
  password: "demopassword",
};

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useReduxDispatch();
  const { addToast } = useToasts();

  const handleSubmit = async (
    values: UserLoginPost,
    actions: FormikHelpers<UserLoginPost>,
  ) => {
    try {
      setIsLoading(true);
      const result = await dispatch(userLogin(values));
      console.log(result);
      actions.resetForm();

      // If this worked correctly, then we need to push to the dashboard and get notes.

      // Get user's notes

      // Push to dashboard
    } catch (error) {
      addToast("Hmm, those details don't seem right. Please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      console.log("here in finally");
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-3">
      <Formik
        initialValues={defaultValues}
        onSubmit={handleSubmit}
        validationSchema={UserLoginValidation}
      >
        <Form>
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <h1>Login</h1>
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <TextInput name="username" type="text" label="Username (Email)" />
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <TextInput name="password" type="password" label="Password" />
            </div>

            <div className="w-100" />

            <div className="col-lg-5">
              <SubmitButton
                name="login-submit-button"
                text="Login"
                loading={isLoading}
                loadingText="Logging in ..."
              />
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
};
