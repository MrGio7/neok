import React from "react";
import Input from "./input";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  return (
    <form
      id="login-form"
      className="flex flex-col items-center justify-center gap-y-2 rounded p-5 dark:bg-white"
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
        <button type="submit" className="rounded px-3 py-1 dark:bg-neutral-900">
          Login
        </button>
        <a
          href="/auth/register"
          className="rounded px-3 py-1 dark:bg-neutral-900"
        >
          Register
        </a>
      </fieldset>
    </form>
  );
}
