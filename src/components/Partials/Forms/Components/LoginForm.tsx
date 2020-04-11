import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/user/actions";
import { UserLoginPost, UserLoginValidation } from "@/store/user/api";
import { UserThunkDispatch, UserShort } from "@/store/user/types";

const defaultValues: UserLoginPost = {
  username: "demousername",
  password: "demopassword",
};

export const LoginForm = () => {
  const user = useSelector((state: { user: UserShort }) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  const dispatch = useDispatch<UserThunkDispatch>();

  const handleSubmit = async (
    values: UserLoginPost,
    actions: FormikHelpers<UserLoginPost>,
  ) => {
    try {
      setIsLoading(true);
      const result = await dispatch(login(values));
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
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-3">
      {JSON.stringify(user)}
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
