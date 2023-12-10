import React from "react";
import { User } from "src/app";
import DateInput from "./DateInput";

interface HeaderProps {
  user: User;
  selectedDate?: Date;
}

export default function Header({ user, selectedDate }: HeaderProps) {
  return (
    <header className="grid w-full grid-cols-[0.2fr_1fr_0.2fr] px-3 py-2">
      <div></div>
      <section className="flex justify-center gap-x-1 text-2xl">
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
          <img src="/svg/leftArrow.svg" alt="left arrow icon" className="w-8" />
        </button>

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
          // inputClassName="text-center"
          defaultValue={selectedDate}
          inputClassName="leading-none"
        />

        <button
          type="button"
          id="nextWeekBtn"
          hx-on:click="
              const currentUrl = new URL(window.location.href);
              const nextWeekDate = new Date(currentUrl.searchParams.get('date'));
              nextWeekDate.setDate(nextWeekDate.getDate() + 7);
              const nextWeek = nextWeekDate.toLocaleDateString('sv')
          
              window.location.href = `/?date=${nextWeek}`;
            "
        >
          <img
            src="/svg/rightArrow.svg"
            alt="right arrow icon"
            className="w-8"
          />
        </button>
      </section>

      <section className="group relative flex items-center gap-x-2 place-self-end">
        <img src="/svg/account.svg" alt="account icon" className="w-9" />

        <article className="absolute right-0 top-full hidden flex-col items-end gap-y-1 rounded bg-neutral-100 px-3 py-2 text-neutral-950 group-hover:flex">
          <a href="/account/settings">Settings</a>
          <button type="button" hx-get="/auth/logout" hx-swap="none">
            Logout
          </button>
        </article>
      </section>
    </header>
  );
}
