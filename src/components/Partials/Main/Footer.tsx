import React from "react";
import { Layout } from "antd";
import { gray900, white } from "@/common/colors";

const { Footer: AntFooter } = Layout;

export const Footer = () => (
  <AntFooter
    style={{ background: gray900, color: white, textAlign: "center" }}
  >
    <a href="https://github.com/johndatserakis">Koa-React-Notes</a>
    {" "}
    is a SPA using Koa (2.3) as the
    <a href="https://github.com/johndatserakis/koa-react-notes-api">backend</a>
    {" "}
    and React (16.8.3) as the
    <a href="https://github.com/johndatserakis/koa-react-notes-api">frontend</a>
    .
  </AntFooter>
);
