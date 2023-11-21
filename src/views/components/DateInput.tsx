import React from "react";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function DateInput({ id, ...props }: DateInputProps) {
  return (
    <label id={id} className="datepicker">
      <span></span>
      <input
        type="date"
        className="cursor-pointer bg-transparent text-center focus-visible:outline-none"
        {...props}
      />
    </label>
  );
}
