import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ForgotForm } from "@/components/user/forms/ForgotForm";

export const Forgot = () => (
  <Container className="py-4">
    <Row>
      <Col>
        <ForgotForm />
      </Col>
    </Row>
  </Container>
);
