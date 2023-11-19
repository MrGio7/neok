import React from "react";
import Errors from "./errors";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <body
      className="bg-cyan-50 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50"
      hx-ext="loading-states, remove-me"
    >
      {children}
      <Errors />
      <script src="/js/index.js" />
    </body>
  );
}
