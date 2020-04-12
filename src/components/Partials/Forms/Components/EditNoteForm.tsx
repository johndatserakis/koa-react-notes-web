import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/Partials/Forms/Inputs/Inputs";
import { useToasts } from "react-toast-notifications";
// // import { useDispatch } from "react-redux";
import { NoteCreatePost, NoteCreatePostValidation } from "@/store/note/api";
// import { createNote } from "@/store/note/actions";
// import { UserThunkDispatch } from "@/store/user/types";
import { ServerError } from "@/common/api";
// import { useHistory } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Note } from "@/store/note/types";

let defaultValues: NoteCreatePost = {
  title: "",
  content: "",
};

interface EditNoteFormProps {
  note: Note;
}

export const EditNoteForm = (props: EditNoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();
  const { addToast } = useToasts();
  // const dispatch = useDispatch<UserThunkDispatch>();

  defaultValues = {
    title: props.note.title,
    content: props.note.content,
  };

  const handleSubmit = async (
    values: NoteCreatePost,
    actions: FormikHelpers<NoteCreatePost>,
  ) => {
    try {
      console.log(values, actions);

      // setIsLoading(true);
      // await dispatch(createNote(values));
      // actions.resetForm();
      // addToast("Note Created", { appearance: "success" });
      // history.push("/dashboard");
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
