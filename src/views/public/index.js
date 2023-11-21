import moment from "moment";

const currentUrl = new URL(window.location.href);

const headerDatePicker = document.getElementById("headerDatePicker");
const headerDatePickerSpan = headerDatePicker.querySelector("span");
const headerDatePickerInput = headerDatePicker.querySelector("input");

headerDatePickerSpan.textContent = moment(
  currentUrl.searchParams.get("date") || new Date(),
)
  .utcOffset("+04:00")
  .format("ddd, MMM DD");

headerDatePickerInput.addEventListener("change", (e) => {
  headerDatePickerSpan.textContent = moment(e.target.value)
    .utcOffset("+04:00")
    .format("ddd, MMM DD");

  window.location.href = `/?date=${e.target.value}`;
});
