import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { NoteCreatePost, NoteCreatePostValidation } from "@/store/notes/api";
import { login } from "@/store/user/actions";
import { getNotes } from "@/store/note/actions";
import { UserThunkDispatch } from "@/store/user/types";
import { ServerError } from "@/common/api";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const defaultValues: NoteCreatePost = {
  title: "",
  content: "",
};

export const CreateNoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<UserThunkDispatch>();

  const handleSubmit = async (
    values: NoteCreatePost,
    actions: FormikHelpers<NoteCreatePost>,
  ) => {
    try {
      setIsLoading(true);
      // await dispatch(login(values));

      // // Get user's notes
      // await dispatch(
      //   getNotes({ sort: "", order: "desc", page: 0, limit: 1000 }),
      // );

      // // Push to dashboard
      // history.push("/dashboard");

      // // Clear inputs
      // actions.resetForm();
    } catch (error) {
      // const e = error as ServerError;
      // if (e && (e.error || e.errors)) {
      //   //
      // }
      // addToast("Hmm, those details don't seem right. Please try again.", {
      //   appearance: "error",
      // });
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
          validationSchema={NoteCreatePostValidation}
        >
          <Form>
            <Row className="justify-content-center">
              <Col lg={6}>
                <h1>Login</h1>
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput
                  name="username"
                  type="text"
                  label="Username (Email)"
                />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="password" type="password" label="Password" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <SubmitButton
                  name="login-submit-button"
                  text="Login"
                  loading={isLoading}
                  loadingText="Logging in ..."
                />
              </Col>
            </Row>
          </Form>
        </Formik>
      </Container>
      <Container className="py-4">
        <Row>
          <Col>
            <Link to="/forgot">Forgot Password</Link>
            <Link to="/reset">Reset Password</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
