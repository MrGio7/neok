import moment from "moment-timezone";
import React from "react";

interface DateInputProps {
  id?: string;
  type?: "date" | "datetime-local";
  name?: string;
  dateFormat?: string;
  onChange?: string;
  defaultValue?: string;
}

export default function DateInput({
  id,
  name,
  type = "date",
  dateFormat = "YYYY-MM-DD HH:mm",
  onChange,
  defaultValue,
}: DateInputProps) {
  return (
    <label id={id} className="datepicker">
      <span>{moment(defaultValue).tz("Asia/Tbilisi").format(dateFormat)}</span>
      <input
        type={type}
        name={name}
        className="cursor-pointer bg-transparent text-center focus-visible:outline-none"
        defaultValue={moment(defaultValue)
          .tz("Asia/Tbilisi")
          .format(type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DDTHH:mm")}
        hx-on:change={
          `
            const label = htmx.closest(this, 'label');
            const span = htmx.find(label, 'span');

            span.textContent = moment(this.value).format('${dateFormat}');
          ` + onChange || ""
        }
      />
    </label>
  );
}
