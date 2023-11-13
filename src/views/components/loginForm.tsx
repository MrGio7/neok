import React from "react";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  return (
    <form id="login-form" hx-post="/auth/login" hx-target="#login-form">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
      <a href="/auth/register">Register</a>
    </form>
  );
}
