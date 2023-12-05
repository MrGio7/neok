import Body from "@components/body";
import Head from "@components/head";
import RegisterForm from "@components/registerForm";
import React from "react";

interface RegisterProps {}

export default function Register({}: RegisterProps) {
  return (
    <html lang="en">
      <Head />
      <Body className="flex h-full flex-col justify-center px-5">
        <RegisterForm />
      </Body>
    </html>
  );
}
