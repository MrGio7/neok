import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: "light" | "dark";
}

export default function Input({
  label,
  theme = "dark",
  className,
  ...props
}: InputProps) {
  return (
    <label className="flex flex-col">
      {label && <span>{label}</span>}
      <input
        className={twMerge(
          "rounded px-2 py-1",
          theme === "dark" && "calendar-picker-light bg-cyan-950 text-cyan-50",
          theme === "light" && "bg-cyan-50 text-cyan-950",
          className,
        )}
        {...props}
      />
    </label>
  );
}
