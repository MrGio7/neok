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
          "rounded border border-cyan-950 px-2 py-1 focus-visible:outline-cyan-950",
          className,
        )}
        {...props}
      />
    </label>
  );
}
