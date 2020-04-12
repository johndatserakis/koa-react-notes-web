import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CreateNoteForm } from "@/components/Partials/Forms/Components/CreateNoteForm";

export const CreateNote = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <CreateNoteForm />
        </Col>
      </Row>
    </Container>
  );
};
