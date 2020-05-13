import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import maintenanceImage from "@/assets/images/utilities/maintenance.png";
import classNames from "classnames";
import styles from "./Maintenance.module.scss";

export const Maintenance = () => (
  <section className={styles.section}>
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <img
            src={maintenanceImage}
            alt="Maintenance Mode"
            className={classNames(
              "img-fluid",
              "d-block",
              "mx-auto",
              styles.imageCallout,
            )}
          />
          <h2>Maintenance</h2>
          <p>We're currently doing some house-cleaning.</p>
          <p>Please check back later. Thank you!</p>
        </Col>
      </Row>
    </Container>
  </section>
);
