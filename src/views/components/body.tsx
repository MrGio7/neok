import React from "react";
import Errors from "./errors";
import SearchFriend from "./searchFriend";
import { twMerge } from "tailwind-merge";

export default function Body({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLBodyElement>) {
  return (
    <body
      className={twMerge(
        "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50",
        className,
      )}
      hx-ext="loading-states, remove-me"
      {...props}
    >
      {children}

      <Errors />

      <script src="/js/index.js" />
    </body>
  );
}
