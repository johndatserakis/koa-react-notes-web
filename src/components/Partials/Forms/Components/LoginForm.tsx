import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
// import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { userLogin } from "@/store/userSlice";

interface LoginForm {
  username: string;
  password: string;
}

const defaultValues: LoginForm = {
  username: "123123123",
  password: "123123123",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleSubmit = async (
    values: LoginForm,
    actions: FormikHelpers<LoginForm>,
  ) => {
    try {
      setIsLoading(true);
      const value = await userLogin(values);
      console.log(value);
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
      <Formik
        initialValues={defaultValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
