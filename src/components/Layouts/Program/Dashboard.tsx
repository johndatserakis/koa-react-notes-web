import React, { useEffect } from "react";
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
import { all } from "@/store/note/actions-api";
import { useToasts } from "react-toast-notifications";
import { setOkToLoadMore, setQuery } from "@/store/note/actions-store";

export const Dashboard = () => {
  const dispatch = useDispatch<GeneralThunkDispatch>();
  const notes = useSelector((state: RootState) => state.note.notes);
  const okToLoadMore = useSelector(
    (state: RootState) => state.note.okToLoadMore,
  );
  const query = useSelector((state: RootState) => state.note.query);
  const history = useHistory();
  const { addToast } = useToasts();

  const loadProgramData = async () => {
    try {
      const result = await dispatch(all(query));

      // Sort out the new query data now...
      if (result.length === query.limit) {
        dispatch(setOkToLoadMore(true));
        dispatch(setQuery({ ...query, page: query.page + 1 }));
      } else {
        dispatch(setOkToLoadMore(false));
      }
    } catch (error) {
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
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
