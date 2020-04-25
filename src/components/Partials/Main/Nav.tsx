import React from "react";
import {
  Nav as BoostrapNav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "@/assets/images/main/lockup.png";
import { logout } from "@/store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserThunkDispatch } from "@/store/user/types";
import { useHistory } from "react-router-dom";
import { RootState, GeneralThunkDispatch } from "@/store";
import { clearNotes } from "@/store/note/actions";
import classNames from "classnames";
import { GoLinkExternal } from "react-icons/go";
import styles from "./Nav.module.scss";

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
            style={{
              marginBottom: "2px",
            }}
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="main-navbar-navigation" />
      <Navbar.Collapse id="main-navbar-navigation">
        <BoostrapNav className="mr-auto">
          <BoostrapNav.Link
            className="mr-2"
            href="https://github.com/johndatserakis/koa-vue-notes-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub <GoLinkExternal />
          </BoostrapNav.Link>
        </BoostrapNav>
        <BoostrapNav className="ml-auto">
          <LinkContainer to="/user/login">
            <BoostrapNav.Link className="mr-2">Login</BoostrapNav.Link>
          </LinkContainer>
          <LinkContainer to="/user/signup">
            <Button className={classNames("btn-blue", styles.navbarButton)}>
              Signup
            </Button>
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
      <Navbar.Toggle aria-controls="main-navbar-navigation" />
      <Navbar.Collapse id="main-navbar-navigation">
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
