import React from "react";

interface TimezoneListProps {}

export default function TimezoneList({}: TimezoneListProps) {
  return (
    <label>
      <input list="timezones" placeholder="timezone" />
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
