import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ResetForm } from "@/components/user/forms/ResetForm";

export const Reset = () => (
  <Container className="py-4">
    <Row>
      <Col>
        <ResetForm />
      </Col>
    </Row>
  </Container>
);
