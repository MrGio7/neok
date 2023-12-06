import React from "react";
import Input from "./input";

interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  return (
    <form
      id="register-form"
      hx-post="/auth/register"
      className="flex flex-col items-center justify-center gap-y-2 rounded p-5 dark:bg-white"
    >
      {/* <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <input type="password" name="password2" placeholder="confirm password" />
      <button type="submit">Register</button> */}

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

      <Input
        type="password"
        name="password2"
        label="Confirm Password"
        required
        minLength={1}
      />

      <Input
        type="text"
        name="timezone"
        list="timezones"
        label="Timezone"
        defaultValue="Asia/Tbilisi"
        required
        minLength={1}
      />
      <datalist id="timezones">
        {Intl.supportedValuesOf("timeZone").map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </datalist>

      <button type="submit" className="rounded px-3 py-1 dark:bg-neutral-900">
        Register
      </button>
    </form>
  );
}
