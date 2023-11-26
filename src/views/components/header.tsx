import moment from "moment";
import React from "react";
import { AccountSVG, LeftArrowSVG, RightArrowSVG } from "../assets/svg";
import DateInput from "./DateInput";

interface HeaderProps {
  username: string;
  date?: string;
}

export default function Header({ username, date }: HeaderProps) {
  return (
    <header className="grid grid-cols-3 px-3 py-2">
      <section className="flex gap-x-1 text-xl">
        <button
          type="button"
          id="prevWeekBtn"
          hx-on:click="
            const currentUrl = new URL(window.location.href);
            const prevWeek = moment(currentUrl.searchParams.get('date'))
            .subtract(1, 'week')
            .format('YYYY-MM-DD');
        
            window.location.href = `/?date=${prevWeek}`;
          "
        >
          <LeftArrowSVG className="text-3xl" />
        </button>
        <button type="button" id="nextWeekBtn">
          <RightArrowSVG
            className="text-3xl"
            hx-on:click="
              const currentUrl = new URL(window.location.href);
              const nextWeek = moment(currentUrl.searchParams.get('date'))
              .add(1, 'week')
              .format('YYYY-MM-DD');
          
              window.location.href = `/?date=${nextWeek}`;
            "
          />
        </button>
      </section>

      <DateInput
        id="headerDatePicker"
        dateFormat="ddd, MMM DD"
        onChange="window.location.href = `/?date=${this.value}`"
        defaultValue={date}
      />

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
