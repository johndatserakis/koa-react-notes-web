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

export const Dashboard = () => {
  const notes = useSelector((state: RootState) => state.note.notes);

  const noteList = notes.map((n) => (
    <ListGroupItem key={n.id} onClick={() => console.log(n)} action>
      <h6>{n.title}</h6>
      <small>{truncate(n.content, 20)}</small>
    </ListGroupItem>
  ));

  return (
    <Container className="py-4">
      <Row>
        <Col>
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
