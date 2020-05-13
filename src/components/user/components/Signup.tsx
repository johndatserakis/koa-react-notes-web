import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SignupForm } from "@/components/user/forms/SignupForm";

export const Signup = () => (
  <Container className="py-4">
    <Row>
      <Col>
        <SignupForm />
      </Col>
    </Row>
  </Container>
);
