import React from "react";
import {
  Nav as BoostrapNav,
  Navbar,
  NavDropdown,
  Button,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "@/assets/images/main/lockup.png";
import userAccountPicture from "@/assets/images/utilities/user-account-picture.png";
import { logout } from "@/store/user/actions-api";
import { useDispatch, useSelector } from "react-redux";
import { UserThunkDispatch } from "@/store/user/types";
import { useHistory } from "react-router-dom";
import { RootState, GeneralThunkDispatch } from "@/store";
import { clearNotes } from "@/store/note/actions-store";
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
    dispatchNote(clearNotes());
    history.push("/");
  };

  return !isLoggedIn ? (
    <Container>
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
              href="https://github.com/johndatserakis/koa-react-notes-web"
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
    </Container>
  ) : (
    <Container>
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
            <NavDropdown
              alignRight
              title={
                <img
                  src={userAccountPicture}
                  width="35"
                  height="35"
                  className="d-inline-block align-middle"
                  alt="User logi"
                  style={{ marginBottom: "2px" }}
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header className="px-2 py-0 small">
                Signed in as <br /> {user.email}
              </NavDropdown.Header>
              <NavDropdown.Divider />
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
    </Container>
  );
};
