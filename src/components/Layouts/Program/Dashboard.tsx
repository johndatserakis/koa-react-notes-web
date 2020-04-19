import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { RootState, GeneralThunkDispatch } from "@/store";
import { truncate } from "@/common/truncate";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { Note } from "@/store/note/types";
import { getNotes } from "@/store/note/actions";
import { useToasts } from "react-toast-notifications";
import { NotesQuery } from "@/store/note/api";

export const Dashboard = () => {
  const dispatch = useDispatch<GeneralThunkDispatch>();
  const notes = useSelector((state: RootState) => state.note.notes);
  const history = useHistory();
  const { addToast } = useToasts();

  const [completedFirstPass, setCompletedFirstPass] = useState(false);
  const [okToLoadMore, setOkToLoadMore] = useState(false);
  const [query, setQuery] = useState<NotesQuery>({
    sort: "",
    order: "desc" as const,
    page: 0,
    limit: 20,
  });

  const loadProgramData = async () => {
    try {
      const result = await dispatch(getNotes(query));

      // Sort out the new query data now...
      if (result.length === query.limit) {
        setOkToLoadMore(true);
        setQuery({ ...query, page: query.page + 1 });
      } else {
        setOkToLoadMore(false);
      }
    } catch (error) {
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
    } finally {
      if (!completedFirstPass) {
        setCompletedFirstPass(true);
      }
    }
  };

  // On the Dashboard's page load, we'll load the program's data.
  useEffect(() => {
    if (!notes.length) {
      loadProgramData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const noteClicked = (note: Note) => {
    history.push(`/edit-note/${note.id}`);
  };

  const noteList = notes.map((n) => (
    <ListGroupItem key={n.id} onClick={() => noteClicked(n)} action>
      <h6>{n.title}</h6>
      <small>{truncate(n.content, 20)}</small>
    </ListGroupItem>
  ));

  const loadMore = () => {
    loadProgramData();
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center mb-3">
        <Col lg={6}>
          <LinkContainer to="/create-note">
            <Button variant="primary" className="mb-4" block>
              Create Note
            </Button>
          </LinkContainer>

          {notes.length > 0 && <ListGroup>{noteList}</ListGroup>}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={6}>
          {okToLoadMore && (
            <Button className="mb-4 btn-orange" block onClick={loadMore}>
              Load more...
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
