import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/partials/forms/inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { NoteCreatePost, NoteCreatePostValidation } from "@/store/note/api";
import { ServerError } from "@/common/api";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Note } from "@/store/note/types";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { updateNote } from "@/store/note/actions";
import { useDispatch } from "react-redux";
import { GeneralThunkDispatch } from "@/store";

let defaultValues: NoteCreatePost = {
  title: "",
  content: "",
};

interface EditNoteFormProps {
  note: Note;
}

export const EditNoteForm = (props: EditNoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<GeneralThunkDispatch>();

  defaultValues = {
    title: props.note.title,
    content: props.note.content,
  };

  const handleSubmit = async (
    values: NoteCreatePost,
    actions: FormikHelpers<NoteCreatePost>,
  ) => {
    try {
      // Ok, so if we're here, the user has edited the note. We'll create a
      // new object that has the new values.
      const editedNote = {
        ...props.note,
        title: values.title,
        content: values.content,
      };

      setIsLoading(true);
      await dispatch(updateNote(editedNote));
      actions.resetForm();
      addToast("Note Edited", { appearance: "success" });
      history.push("/dashboard");
    } catch (error) {
      const e = error as ServerError;
      if (e && (e.error || e.errors)) {
        //
      }
      addToast("There was an error updating your note. Please try again.", {
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
              <h1>Edit Note</h1>
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
                name="update-note-submit-button"
                text="Update"
                loading={isLoading}
                loadingText="Updating ..."
              />
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};
