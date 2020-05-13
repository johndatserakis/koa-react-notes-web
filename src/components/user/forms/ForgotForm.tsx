import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  SubmitButton,
} from "@/components/partials/forms/inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { forgot } from "@/store/user/actions-api";
import {
  UserForgotPost,
  UserForgotPostValidation,
} from "@/store/user/api-types";
import { UserThunkDispatch } from "@/store/user/types";
import { ServerError } from "@/common/api";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const defaultValues: UserForgotPost = {
  email: "",
  url: `${process.env.REACT_APP_URL}/user/reset`,
  type: "web",
};

export const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<UserThunkDispatch>();

  const handleSubmit = async (
    values: UserForgotPost,
    actions: FormikHelpers<UserForgotPost>,
  ) => {
    try {
      setIsLoading(true);
      await dispatch(forgot(values));

      // Clear inputs
      actions.resetForm();

      // Push to dashboard
      history.push("/");

      addToast("Please check your email", { appearance: "success" });
    } catch (error) {
      const e = error as ServerError;
      if (e && (e.error || e.errors)) {
        //
      }

      addToast("Please check your email", { appearance: "success" });
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
          validationSchema={UserForgotPostValidation}
        >
          <Form>
            <Row className="justify-content-center">
              <Col lg={6}>
                <h1>Forgot</h1>
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="email" type="text" label="Email" />
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
            <Link to="/user/login">Login</Link> {" | "}
            <Link to="/user/signup">Signup</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
