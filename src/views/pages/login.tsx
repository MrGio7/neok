import Body from "@components/body";
import Head from "@components/head";
import LoginForm from "@components/loginForm";
import React from "react";

interface LoginProps {}

export default function Login({}: LoginProps) {
  return (
    <html lang="en">
      <Head />
      <Body className="flex h-full flex-col justify-center px-5">
        <LoginForm />
      </Body>
    </html>
  );
}
