import React from "react";
import { useSelector } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { RootState } from "@/store";
import { truncate } from "@/common/truncate";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { Note } from "@/store/note/types";

export const Dashboard = () => {
  const notes = useSelector((state: RootState) => state.note.notes);
  const history = useHistory();

  const noteClicked = (note: Note) => {
    history.push(`/edit-note/${note.id}`);
  };

  const noteList = notes.map((n) => (
    <ListGroupItem key={n.id} onClick={() => noteClicked(n)} action>
      <h6>{n.title}</h6>
      <small>{truncate(n.content, 20)}</small>
    </ListGroupItem>
  ));

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          <LinkContainer to="/create-note">
            <Button variant="primary" className="mb-4">
              Create Note
            </Button>
          </LinkContainer>

          {notes.length > 0 && <ListGroup>{noteList}</ListGroup>}
        </Col>
      </Row>
    </Container>
  );
};
