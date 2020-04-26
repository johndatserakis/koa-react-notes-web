import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EditNoteForm } from "@/components/partials/forms/components/EditNoteForm";
import { useParams, useHistory } from "react-router-dom";
import { find } from "@/store/note/actions-api";
import { useDispatch } from "react-redux";
import { NoteThunkDispatch, Note } from "@/store/note/types";
import { useToasts } from "react-toast-notifications";

export const EditNote = () => {
  const { id } = useParams();
  const { addToast } = useToasts();
  const dispatch = useDispatch<NoteThunkDispatch>();
  const [note, setNote] = useState<Note>();
  const history = useHistory();

  const getNoteForEdit = async (noteId: number) => {
    try {
      const n: Note = await dispatch(find(noteId));

      if (!n.id) {
        addToast("No note found...", {
          appearance: "error",
        });

        history.push("/dashboard");

        return;
      }

      setNote(n);
    } catch (error) {
      addToast("No note found...", {
        appearance: "error",
      });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      getNoteForEdit(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="py-4">
      <Row>
        <Col>{note && <EditNoteForm note={note} />}</Col>
      </Row>
    </Container>
  );
};
