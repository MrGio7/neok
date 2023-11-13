import React from "react";

interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  return (
    <form id="register-form" hx-post="/auth/register">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <input type="password" name="password2" placeholder="confirm password" />
      <button type="submit">Register</button>
    </form>
  );
}
