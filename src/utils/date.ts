type FormatDateForDateInputArgs = {
  date: Date;
  timeZone: Intl.DateTimeFormatOptions["timeZone"];
  withTime?: boolean;
};

export function formatDateForDateInput({
  date,
  timeZone,
  withTime = false,
}: FormatDateForDateInputArgs): string {
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  };

  if (withTime) {
    dateTimeFormatOptions.hour = "2-digit";
    dateTimeFormatOptions.minute = "2-digit";
    dateTimeFormatOptions.hour12 = false;
  }

  return date.toLocaleString("sv-SE", dateTimeFormatOptions).replace(" ", "T");
}
