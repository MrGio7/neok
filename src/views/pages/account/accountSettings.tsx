import Body from "@components/body";
import Head from "@components/head";
import Input from "@components/input";
import React from "react";
import { User } from "src/app";

interface AccountSettingsProps {
  user: User;
}

export default function AccountSettings({ user }: AccountSettingsProps) {
  return (
    <html lang="en">
      <Head />
      <Body className="flex h-full flex-col justify-center px-5">
        <form
          hx-post="/account/update"
          className="flex flex-col items-center justify-center gap-y-2 rounded p-5 dark:bg-white"
          hx-swap="none"
        >
          <a href="/">
            <img
              src="/svg/logo.svg"
              alt="logo"
              className="aspect-square w-40 rounded-full"
            />
          </a>

          <Input
            type="text"
            name="username"
            label="Username"
            defaultValue={user.username}
            readOnly
          />

          <Input type="password" name="password" label="Password" />

          <Input type="password" name="password2" label="Confirm Password" />

          <Input
            type="text"
            name="timezone"
            list="timezones"
            label="Timezone"
            defaultValue={user.timezone}
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
            Save
          </button>
        </form>
      </Body>
    </html>
  );
}
