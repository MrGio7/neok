import React from "react";
import { formatDateForDateInput } from "src/utils/date";
import { twMerge } from "tailwind-merge";

interface DateInputProps {
  type: "date" | "datetime-local";
  name: string;
  label?: string;
  format?: Intl.DateTimeFormatOptions;
  onChange?: string;
  defaultValue?: Date;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function DateInput({
  type,
  name,
  label,
  format,
  onChange,
  defaultValue,
  className,
  labelClassName,
  inputClassName,
}: DateInputProps) {
  return (
    <label className={twMerge("datepicker flex flex-col", className)}>
      {!!label && (
        <p className={twMerge("text-left", labelClassName)}>{label}</p>
      )}
      <span
        className={twMerge(
          "h-[32px] w-full rounded px-2 py-1 text-left",
          inputClassName,
        )}
      >
        {defaultValue && defaultValue.toLocaleString("en-US", format)}
      </span>
      <input
        type={type}
        name={name}
        className="h-full w-full"
        defaultValue={
          defaultValue &&
          formatDateForDateInput({
            date: defaultValue,
            timeZone: format?.timeZone,
            withTime: type === "datetime-local",
          })
        }
        hx-on={
          `change:
            const label = htmx.closest(this, 'label');
            const span = htmx.find(label, 'span');

            span.textContent = new Date(this.value).toLocaleString("en-US", ${JSON.stringify(
              format,
            )});
          ` + (onChange || "")
        }
      />
    </label>
  );
}
