const addTaskFormDialog = document.getElementById("addTaskFormDialog");

$(function () {
  $("#datepicker").datepicker({
    dateFormat: "D, M dd",
  });

  $("#taskStartDate").datepicker();

  $("#addTaskForm").dialog({
    autoOpen: false,
  });

  $("#showAddTaskFormBtn").click(function (e) {
    $(document).on("click", function (ev) {
      console.info(ev.target);
    });

    $("#addTaskForm").dialog("open");
  });
});
