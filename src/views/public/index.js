const moment = require("moment");

const addTaskFormDialog = document.getElementById("addTaskFormDialog");

$(function () {
  $("#datepicker").datepicker({
    dateFormat: "D, M dd",
  });

  $("#datepicker").change(function () {
    const selectedDate = $("#datepicker").datepicker("getDate");
    selectedDate?.setHours(12);

    const formattedDate = selectedDate?.toISOString().split("T")[0];

    window.location.href = `/?date=${formattedDate}`;
  });

  $("#prevWeekBtn").click(function () {
    const selectedDate = $("#datepicker").datepicker("getDate");
    selectedDate?.setHours(12);
    selectedDate?.setDate(selectedDate.getDate() - 7);

    const formattedDate = selectedDate?.toISOString().split("T")[0];

    window.location.href = `/?date=${formattedDate}`;
  });

  $("#nextWeekBtn").click(function () {
    const selectedDate = $("#datepicker").datepicker("getDate");
    selectedDate?.setHours(12);
    selectedDate?.setDate(selectedDate.getDate() + 7);

    const formattedDate = selectedDate?.toISOString().split("T")[0];

    window.location.href = `/?date=${formattedDate}`;
  });

  $("#taskStartDate").datepicker();

  $("#addTaskForm").dialog({
    autoOpen: false,
  });

  $("#showAddTaskFormBtn").click(function (e) {
    $(document).on("click", function (ev) {
      console.info(ev.target);
    });

    $("#taskStartDate").val(new Date().toLocaleDateString());

    $("#addTaskForm").dialog("open");
  });
});
