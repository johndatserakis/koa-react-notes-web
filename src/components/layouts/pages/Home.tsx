import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user.id;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col>
          <h1>
            <strong>Home</strong>
          </h1>

          {isLoggedIn && (
            <div>
              <p>Here's your user...</p>
              <p>
                <strong>{JSON.stringify(user)}</strong>
              </p>
            </div>
          )}

          <p>
            <i className="fa fa-info-circle fa-fw" /> This is a simple SPA built
            using Koa (2.5.1) as the backend and React (16.8.3) as the frontend.
            If you don't want to create an account you can just use{" "}
            <strong>demousername</strong> and <strong>demopassword</strong> to
            login to the app.
          </p>

          <p>
            This site has a sister! Visit it here{" "}
            <a
              href="https://koa-vue-notes-web.innermonkdesign.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://koa-vue-notes-web.innermonkdesign.com
            </a>
            . It's the exact same app - but written in Vue! It's also{" "}
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-sourced.
            </a>
          </p>

          {/* React */}
          <p>
            <a
              href="https://github.com/johndatserakis/koa-react-notes-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/react_frontend--social.svg?style=social"
                alt="Koa-React-Notes-Web Github"
              />
            </a>{" "}
            <a
              href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-react-notes-web&url=%5Bobject%20Object%5D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-react-notes-web.svg?style=social"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://raw.githubusercontent.com/johndatserakis/koa-react-notes-web/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/license-MIT-blue.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-react-notes-web/stargazers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/stars/johndatserakis/koa-react-notes-web.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-react-notes-web/network"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/forks/johndatserakis/koa-react-notes-web.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
          </p>

          {/* Vue */}
          <p>
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/vue_frontend--social.svg?style=social"
                alt="Koa-Vue-Notes-Web Github"
              />
            </a>{" "}
            <a
              href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-vue-notes-web&url=%5Bobject%20Object%5D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-web.svg?style=social"
                alt="Koa-Vue-Notes"
              />
            </a>{" "}
            <a
              href="https://raw.githubusercontent.com/johndatserakis/koa-vue-notes-web/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/license-MIT-blue.svg"
                alt="Koa-Vue-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-web/stargazers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/stars/johndatserakis/koa-vue-notes-web.svg"
                alt="Koa-Vue-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-web/network"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/forks/johndatserakis/koa-vue-notes-web.svg"
                alt="Koa-Vue-Notes"
              />
            </a>{" "}
          </p>

          {/* Koa */}
          <p>
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/koa_backend--social.svg?style=social"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-vue-notes-api&url=%5Bobject%20Object%5D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-api.svg?style=social"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://raw.githubusercontent.com/johndatserakis/koa-vue-notes-api/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/license-MIT-blue.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-api/stargazers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/stars/johndatserakis/koa-vue-notes-api.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-api/network"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/forks/johndatserakis/koa-vue-notes-api.svg"
                alt="Koa-React-Notes"
              />
            </a>{" "}
          </p>
        </Col>
      </Row>
    </Container>
  );
};
