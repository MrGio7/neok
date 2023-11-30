import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col">
      {label && <span>{label}</span>}
      <input
        className={twMerge(
          "rounded bg-cyan-50 px-2 py-1 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50",
          className,
        )}
        {...props}
      />
    </label>
  );
}
