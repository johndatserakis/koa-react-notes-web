import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { NoteCreatePost, NoteCreatePostValidation } from "@/store/note/api";
import { createNote } from "@/store/note/actions";
import { ServerError } from "@/common/api";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { NoteThunkDispatch } from "@/store/note/types";
import { LinkContainer } from "react-router-bootstrap";

const defaultValues: NoteCreatePost = {
  title: "",
  content: "",
};

export const CreateNoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<NoteThunkDispatch>();

  const handleSubmit = async (
    values: NoteCreatePost,
    actions: FormikHelpers<NoteCreatePost>,
  ) => {
    try {
      setIsLoading(true);
      await dispatch(createNote(values));
      actions.resetForm();
      addToast("Note Created", { appearance: "success" });
      history.push("/dashboard");
    } catch (error) {
      const e = error as ServerError;
      if (e && (e.error || e.errors)) {
        //
      }
      addToast("There was an error creating your note. Please try again.", {
        appearance: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Formik
        initialValues={defaultValues}
        onSubmit={handleSubmit}
        validationSchema={NoteCreatePostValidation}
      >
        <Form>
          <Row className="justify-content-center">
            <Col lg={6}>
              <LinkContainer to="/dashboard">
                <Button variant="primary" size="sm" className="mb-3">
                  Back
                </Button>
              </LinkContainer>
            </Col>

            <div className="w-100" />

            <Col lg={6}>
              <h1>Create Note</h1>
            </Col>

            <div className="w-100" />

            <Col lg={6}>
              <TextInput name="title" type="text" label="Title" />
            </Col>

            <div className="w-100" />

            <Col lg={6}>
              <TextArea name="content" label="Content" />
            </Col>

            <div className="w-100" />

            <Col lg={6}>
              <SubmitButton
                name="create-note-submit-button"
                text="Create"
                loading={isLoading}
                loadingText="Creating ..."
              />
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};
