import React from "react";
import BurgerBar from "./burgerBar";
import { AccountSVG } from "../assets/svg";
import moment from "moment";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  return (
    <header className="grid grid-cols-3 px-3 py-2">
      <BurgerBar />

      <input
        type="text"
        id="datepicker"
        className="cursor-pointer bg-transparent text-center focus-visible:outline-none"
        defaultValue={moment().utcOffset("+04:00").format("ddd, MMM DD")}
        readOnly
      />

      <section className="group relative flex items-center gap-x-2 place-self-end">
        <span>{username}</span>

        <AccountSVG className="text-3xl" />

        <article className="absolute right-0 top-full hidden group-hover:block">
          <button type="button" hx-get="/auth/logout">
            Logout
          </button>
        </article>
      </section>
    </header>
  );
}
