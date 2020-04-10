import React from "react";
import { Nav as BoostrapNav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "@/assets/images/main/lockup-color.png";

export const Nav = () => (
  <Navbar bg="light" expand="lg">
    <LinkContainer to="/">
      <Navbar.Brand>
        <img
          src={logo}
          width="151"
          height="21"
          className="d-inline-block align-middle"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <BoostrapNav className="mr-auto">
        {/* <BoostrapNav.Link href="#login">Login</BoostrapNav.Link> */}
        <LinkContainer to="/user/login">
          <BoostrapNav.Link>Login</BoostrapNav.Link>
        </LinkContainer>
        <LinkContainer to="/user/signup">
          <BoostrapNav.Link>Signup</BoostrapNav.Link>
        </LinkContainer>

        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </BoostrapNav>
    </Navbar.Collapse>
  </Navbar>
);
