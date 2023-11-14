import React from "react";
import BurgerBar from "./burgerBar";
import { AccountSVG } from "../assets/svg";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-2">
      <BurgerBar />
      <section className="group relative flex items-center gap-x-2">
        <span>{username}</span>

        <AccountSVG className="text-3xl text-cyan-950" />

        <article className="absolute right-0 top-full hidden h-20 w-20 bg-red-500 group-hover:block">
          <button type="button" hx-get="auth/logout">
            Logout
          </button>
        </article>
      </section>
    </header>
  );
}
