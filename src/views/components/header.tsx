import React from "react";
import { User } from "src/app";
import { AccountSVG, LeftArrowSVG, RightArrowSVG } from "../assets/svg";
import DateInput from "./DateInput";

interface HeaderProps {
  user: User;
  selectedDate?: Date;
}

export default function Header({ user, selectedDate }: HeaderProps) {
  return (
    <header className="grid grid-cols-3 px-3 py-2">
      <section className="flex gap-x-1 text-xl">
        <button
          type="button"
          id="prevWeekBtn"
          hx-on:click="
            const currentUrl = new URL(window.location.href);
            const prevWeekDate = new Date(currentUrl.searchParams.get('date'));
            prevWeekDate.setDate(prevWeekDate.getDate() - 7);
            const prevWeek = prevWeekDate.toLocaleDateString('sv')
        
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
              const nextWeekDate = new Date(currentUrl.searchParams.get('date'));
              nextWeekDate.setDate(nextWeekDate.getDate() - 7);
              const nextWeek = nextWeekDate.toLocaleDateString('sv')
          
              window.location.href = `/?date=${nextWeek}`;
            "
          />
        </button>
      </section>

      <DateInput
        name="headerDateInput"
        type="date"
        format={{
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: user.timezone,
        }}
        onChange="window.location.href = `/?date=${this.value}`"
        defaultValue={selectedDate}
      />

      <section className="group relative flex items-center gap-x-2 place-self-end">
        <span>{user.username}</span>

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
