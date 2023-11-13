import Body from "@components/body";
import Head from "@components/head";
import LoginForm from "@components/loginForm";
import React from "react";

interface LoginProps {}

export default function Login({}: LoginProps) {
  return (
    <html lang="en">
      <Head />
      <Body>
        <LoginForm />
      </Body>
    </html>
  );
}
