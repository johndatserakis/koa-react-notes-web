import React from "react";
import { Nav as BoostrapNav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "@/assets/images/main/lockup.png";
import { logout } from "@/store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserThunkDispatch } from "@/store/user/types";
import { useHistory } from "react-router-dom";
import { RootState, GeneralThunkDispatch } from "@/store";
import { clearNotes } from "@/store/note/actions";

export const Nav = () => {
  const dispatchUser = useDispatch<UserThunkDispatch>();
  const dispatchNote = useDispatch<GeneralThunkDispatch>();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user.id;

  const navLogout = async () => {
    await dispatchUser(logout());
    await dispatchNote(clearNotes());
    history.push("/");
  };

  return !isLoggedIn ? (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src={logo}
            width="151"
            height="21"
            className="d-inline-block align-middle"
            alt="React Bootstrap logo"
            style={{ marginBottom: "2px" }}
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <BoostrapNav className="mr-auto">
          <LinkContainer to="/user/login">
            <BoostrapNav.Link>Login</BoostrapNav.Link>
          </LinkContainer>
          <LinkContainer to="/user/signup">
            <BoostrapNav.Link>Signup</BoostrapNav.Link>
          </LinkContainer>
        </BoostrapNav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/dashboard">
        <Navbar.Brand>
          <img
            src={logo}
            width="151"
            height="21"
            className="d-inline-block align-middle"
            alt="React Bootstrap logo"
            style={{ marginBottom: "2px" }}
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <BoostrapNav className="ml-auto">
          <NavDropdown title={user.email} id="basic-nav-dropdown">
            <LinkContainer to="/dashboard" exact>
              <NavDropdown.Item>Dashboard</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/create-note" exact>
              <NavDropdown.Item>Create Note</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/" exact>
              <NavDropdown.Item>App Homepage</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item
              onClick={() => {
                navLogout();
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </BoostrapNav>
      </Navbar.Collapse>
    </Navbar>
  );
};
