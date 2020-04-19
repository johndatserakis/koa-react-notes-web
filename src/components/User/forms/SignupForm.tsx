import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  SubmitButton,
} from "@/components/partials/forms/inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { signup } from "@/store/user/actions";
import {
  UserSignupPost,
  UserSignupPostWithPasswordConfirm,
  UserSignupPostWithPasswordConfirmValidation,
} from "@/store/user/api";
import { UserThunkDispatch } from "@/store/user/types";
import { ServerError } from "@/common/api";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const defaultValues: UserSignupPostWithPasswordConfirm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<UserThunkDispatch>();

  const handleSubmit = async (
    values: UserSignupPostWithPasswordConfirm,
    actions: FormikHelpers<UserSignupPostWithPasswordConfirm>,
  ) => {
    try {
      setIsLoading(true);
      const { passwordConfirm, ...valuesNoPasswordConfirm } = values;
      const convertedValues: UserSignupPost = { ...valuesNoPasswordConfirm };
      await dispatch(signup(convertedValues));

      // Clear inputs
      actions.resetForm();

      // Push home
      history.push("/");

      addToast("Account created. Please login.", { appearance: "success" });
    } catch (error) {
      const e = error as ServerError;
      if (e && (e.error || e.errors)) {
        //
      }

      addToast("Hmm, those details don't seem right. Please try again.", {
        appearance: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container className="py-4">
        <Formik
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          validationSchema={UserSignupPostWithPasswordConfirmValidation}
        >
          <Form>
            <Row className="justify-content-center">
              <Col lg={6}>
                <h1>Signup</h1>
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="firstName" type="text" label="First Name" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="lastName" type="text" label="Last Name" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="username" type="text" label="Username" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="email" type="text" label="Email" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="password" type="password" label="Password" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput
                  name="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <SubmitButton
                  name="signup-submit-button"
                  text="Signup"
                  loading={isLoading}
                  loadingText="Signing in ..."
                />
              </Col>
            </Row>
          </Form>
        </Formik>
      </Container>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Link to="/user/forgot">Login</Link> {" | "}
            <Link to="/user/forgot">Forgot Password</Link> {" | "}
            <Link to="/user/reset">Reset Password</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
