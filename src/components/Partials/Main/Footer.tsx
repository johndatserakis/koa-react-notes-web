import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => (
  <Container className="p-4 text-center">
    <Row>
      <Col>
        <a href="https://github.com/johndatserakis">Koa-React-Notes</a> is a SPA
        using Koa (2.3) as the{" "}
        <a href="https://github.com/johndatserakis/koa-react-notes-api">
          backend
        </a>{" "}
        and React (16.8.3) as the{" "}
        <a href="https://github.com/johndatserakis/koa-react-notes-api">
          frontend
        </a>
        .
      </Col>
    </Row>
  </Container>
);
