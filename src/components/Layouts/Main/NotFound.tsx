import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import notFoundImage from "@/assets/images/utilities/404.png";
import { LinkContainer } from "react-router-bootstrap";
import classNames from "classnames";
import styles from "./NotFound.module.scss";

export const NotFound = () => (
  <section className={styles.section}>
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <img
            src={notFoundImage}
            alt="404 - Page Not Found"
            className={classNames(
              "img-fluid",
              "d-block",
              "mx-auto",
              styles.imageCallout,
            )}
          />
          <h2>Not Found</h2>
          <p>Hmm, we couldn't quite find what you were looking for.</p>
          <LinkContainer to="/">
            <Button className="btn-blue">Go Home</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  </section>
);
