import React from "react";
import { LoginForm } from "@/components/User/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

export const Login = () => (
  <Container className="py-4">
    <Row>
      <Col>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);
