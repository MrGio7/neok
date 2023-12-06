import Body from "@components/body";
import Head from "@components/head";
import Input from "@components/input";
import React from "react";

interface RegisterProps {}

export default function Register({}: RegisterProps) {
  return (
    <html lang="en">
      <Head />
      <Body className="flex h-full flex-col justify-center px-5">
        <form
          id="register-form"
          hx-post="/auth/register"
          className="flex flex-col items-center justify-center gap-y-2 rounded p-5 dark:bg-white"
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

          <button
            type="submit"
            className="rounded px-3 py-1 dark:bg-neutral-900"
          >
            Register
          </button>
        </form>
      </Body>
    </html>
  );
}
