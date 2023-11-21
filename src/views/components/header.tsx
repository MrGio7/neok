import moment from "moment";
import React from "react";
import { AccountSVG } from "../assets/svg";
import DateInput from "./DateInput";

interface HeaderProps {
  username: string;
  date?: string;
}

export default function Header({
  username,
  date = moment().utcOffset("+04:00").format("YYYY-MM-DD"),
}: HeaderProps) {
  return (
    <header className="grid grid-cols-3 px-3 py-2">
      <section className="flex gap-x-2 text-xl">
        <button
          type="button"
          id="prevWeekBtn"
          className="h-7 w-7 rounded-full font-bold dark:bg-cyan-50 dark:text-cyan-950"
        >
          {"<"}
        </button>
        <button
          type="button"
          id="nextWeekBtn"
          className="h-7 w-7 rounded-full font-bold dark:bg-cyan-50 dark:text-cyan-950"
        >
          {">"}
        </button>
      </section>

      {/* <input
        type="text"
        id="datepicker"
        className="cursor-pointer bg-transparent text-center focus-visible:outline-none"
        defaultValue={moment(date).utcOffset("+04:00").format("ddd, MMM DD")}
        readOnly
      /> */}

      <DateInput id="headerDatePicker" />

      <section className="group relative flex items-center gap-x-2 place-self-end">
        <span>{username}</span>

        <AccountSVG className="text-3xl" />

        <article className="absolute right-0 top-full hidden group-hover:block">
          <button type="button" hx-get="/auth/logout" hx-swap="none">
            Logout
          </button>
        </article>
      </section>
    </header>
  );
}
