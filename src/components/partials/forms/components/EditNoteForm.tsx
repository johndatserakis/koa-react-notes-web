import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/partials/forms/inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import {
  NoteCreatePost,
  NoteCreatePostValidation,
} from "@/store/note/api-types";
import { ServerError } from "@/common/api";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Note } from "@/store/note/types";
import { useHistory } from "react-router-dom";
import { update, del as delActionApi } from "@/store/note/actions-api";
import { useDispatch } from "react-redux";
import { GeneralThunkDispatch } from "@/store";
import { GoChevronLeft } from "react-icons/go";
import { LinkContainer } from "react-router-bootstrap";

type EditNoteFormProps = {
  note: Note;
};

export const EditNoteForm = (props: EditNoteFormProps) => {
  let defaultValues: NoteCreatePost = {
    title: "",
    content: "",
  };

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
      await dispatch(update(editedNote));
      actions.resetForm();
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

  const del = async () => {
    const result = window.confirm("Are you sure you want to delete this note?");
    if (!result) {
      return;
    }

    try {
      await dispatch(delActionApi(props.note));
      history.push("/dashboard");
    } catch (error) {
      //
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
                  <GoChevronLeft /> Dashboard
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

            <Col lg={6} className="mb-3">
              <SubmitButton
                name="update-note-submit-button"
                text="Update"
                loading={isLoading}
                loadingText="Updating ..."
              />
            </Col>

            <div className="w-100" />

            <Col lg={6}>
              <Button
                variant="danger"
                className="mb-3"
                block
                type="button"
                onClick={del}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};
