import React, { useEffect } from "react";
import Errors from "./errors";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <body hx-ext="loading-states, remove-me">
      {children}
      <Errors />
    </body>
  );
}
