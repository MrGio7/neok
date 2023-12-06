import { type } from "os";
import React from "react";
import { twMerge } from "tailwind-merge";

interface MessageProps {
  type: "error" | "success" | "info";
  message: string;
}

export default function Message({ type, message }: MessageProps) {
  return (
    <li
      remove-me="3s"
      className={twMerge(
        "whitespace-pre-wrap rounded px-3 py-1",
        type === "error" && "bg-red-100 text-red-900",
        type === "success" && "bg-green-100 text-green-900",
        type === "info" && "bg-blue-100 text-blue-900",
      )}
    >
      {message}
    </li>
  );
}
