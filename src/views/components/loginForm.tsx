import React from "react";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  return (
    <form id="login-form" hx-post="/auth/login">
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        minLength={1}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        required
        minLength={1}
      />
      <button type="submit">Login</button>
      <a href="/auth/register">Register</a>
    </form>
  );
}
