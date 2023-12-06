import React from "react";

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <li
      remove-me="3s"
      className="whitespace-pre-wrap rounded px-3 py-1 dark:bg-red-100 dark:text-red-900"
    >
      {error}
    </li>
  );
}
