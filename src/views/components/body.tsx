import React from "react";
import Errors from "./errors";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <body
      className="bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50"
      hx-ext="loading-states, remove-me"
    >
      {children}
      <Errors />

      <script src="/js/index.js" />
    </body>
  );
}
