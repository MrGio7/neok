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

const addTaskDetailsBtns = document.getElementsByClassName("addTaskDetailsBtn");
const addTaskFormDialog = document.getElementById("addTaskFormDialog");
const addTaskForm = document.getElementById("addTaskForm");
const addTaskFormStartDate = document.getElementById("addTaskFormStartDate");

for (let i = 0; i < addTaskDetailsBtns.length; i++) {
  addTaskDetailsBtns[i].addEventListener("click", (e) => {
    addTaskFormStartDate.value = moment(e.target.value).format(
      "yyyy-MM-DDThh:mm",
    );
    addTaskFormDialog.showModal();
  });
}

document.addEventListener("closeAddTaskFormDialog", (e) => {
  addTaskFormDialog.close();
  addTaskForm.reset();
});

addTaskFormDialog.addEventListener("click", (e) => {
  if (e.target === addTaskFormDialog) {
    addTaskFormDialog.close();
  }
});
