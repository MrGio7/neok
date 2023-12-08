import React from "react";
import { twMerge } from "tailwind-merge";
import Messages from "./messages";

export default function Body({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLBodyElement>) {
  return (
    <body
      className={twMerge(
        "bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50",
        className,
      )}
      hx-ext="loading-states, remove-me"
      {...props}
    >
      {children}

      <Messages />

      <script src="/js/index.js" />
    </body>
  );
}
