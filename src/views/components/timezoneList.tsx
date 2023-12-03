import React from "react";
import Input from "./input";

interface TimezoneListProps {}

export default function TimezoneList({}: TimezoneListProps) {
  return (
    <label>
      <Input type="text" list="timezones" placeholder="timezone" />
      <datalist id="timezones">
        {Intl.supportedValuesOf("timeZone").map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </datalist>
    </label>
  );
}
