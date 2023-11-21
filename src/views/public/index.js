$(function () {
  $("#datepicker").datepicker({
    dateFormat: "D, M dd",
  });

  $("#taskStartDate").datepicker({
    dateFormat: "yy-mm-dd",
  });

  $("#datepicker").change(function () {
    const selectedDate = $("#datepicker").datepicker("getDate");
    selectedDate?.setHours(12);

    const formattedDate = selectedDate?.toISOString().split("T")[0];

    window.location.href = `/?date=${formattedDate}`;
  });

  $("#addTaskForm").dialog({
    autoOpen: false,
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

  $(".addTaskDetailsBtn").click(function (ev) {
    $("#taskStartDate").datepicker("setDate", new Date(ev.target.value));

    $("#addTaskForm").dialog("open");
  });
});
