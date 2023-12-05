import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.HTMLAttributes<HTMLSpanElement>;
  containerProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export default function Input({
  label,
  containerProps,
  labelProps,
  ...inputProps
}: InputProps) {
  return (
    <label
      {...containerProps}
      className={twMerge("flex flex-col", containerProps?.className)}
    >
      {label && (
        <span
          {...labelProps}
          className={twMerge("dark:text-neutral-950", labelProps?.className)}
        >
          {label}
        </span>
      )}

      <input
        {...inputProps}
        className={twMerge(
          "rounded bg-neutral-100 px-2 py-1 text-neutral-950 outline-none dark:bg-neutral-900 dark:text-neutral-50",
          inputProps?.className,
        )}
      />
    </label>
  );
}
