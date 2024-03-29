import Body from "@components/body";
import Head from "@components/head";
import Input from "@components/input";
import React from "react";

interface LoginProps {}

export default function Login({}: LoginProps) {
  return (
    <html lang="en">
      <Head />
      <Body className="flex h-full flex-col justify-center px-5">
        <form
          id="login-form"
          className="flex flex-col items-center justify-center gap-y-2 rounded bg-white p-5"
          hx-post="/auth/login"
        >
          <img
            src="/svg/logo.svg"
            alt="logo"
            className="aspect-square w-40 rounded-full"
          />

          <Input
            type="text"
            name="username"
            label="Username"
            required
            minLength={1}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            required
            minLength={1}
          />

          <fieldset className="grid grid-cols-2 gap-x-2">
            <button type="submit" className="rounded bg-neutral-700 px-3 py-1">
              Login
            </button>
            <a
              href="/auth/register"
              className="rounded bg-neutral-700 px-3 py-1"
            >
              Register
            </a>
          </fieldset>
        </form>
      </Body>
    </html>
  );
}
