import React from "react";
import { formatDateForDateInput } from "src/utils/date";

interface DateInputProps {
  type: "date" | "datetime-local";
  name: string;
  format?: Intl.DateTimeFormatOptions;
  onChange?: string;
  defaultValue?: Date;
}

export default function DateInput({
  type,
  name,
  format,
  onChange,
  defaultValue,
}: DateInputProps) {
  return (
    <label className="datepicker flex items-center justify-center">
      <span className="rounded bg-cyan-50 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50">
        {defaultValue && defaultValue.toLocaleString("en-US", format)}
      </span>
      <input
        type={type}
        name={name}
        className={"rounded px-2 py-1"}
        defaultValue={
          defaultValue &&
          formatDateForDateInput({
            date: defaultValue,
            timeZone: format?.timeZone,
            withTime: type === "datetime-local",
          })
        }
        hx-on:change={
          `
            const label = htmx.closest(this, 'label');
            const span = htmx.find(label, 'span');

            span.textContent = new Date(this.value).toLocaleString("en-US", ${JSON.stringify(
              format,
            )});
          ` + onChange || ""
        }
      />
    </label>
  );
}
