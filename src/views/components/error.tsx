import React from "react";

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <li remove-me="3s" className="whitespace-pre-wrap bg-red-100">
      {error}
    </li>
  );
}
