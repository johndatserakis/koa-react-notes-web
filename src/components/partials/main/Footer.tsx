import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => (
  <Container className="p-4 text-center">
    <Row>
      <Col>
        <p>
          <a
            href="https://github.com/johndatserakis/koa-vue-notes-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Koa-React-Notes
          </a>{" "}
          is a SPA using Koa (2.3) as the{" "}
          <a
            href="https://github.com/johndatserakis/koa-vue-notes-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            backend
          </a>{" "}
          and React (16.8.3) as the{" "}
          <a
            href="https://github.com/johndatserakis/koa-react-notes-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            frontend
          </a>
          .
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>
          Made with{" "}
          <span role="img" aria-label="coffee">
            ☕️
          </span>{" "}
          by{" "}
          <a
            href="https://www.johndatserakis.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            John Datserakis
          </a>
          .
        </p>
      </Col>
    </Row>
  </Container>
);
