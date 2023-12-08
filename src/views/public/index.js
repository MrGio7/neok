document.addEventListener("click", (e) => {
  const taskDetailDialog = document.getElementById("taskDetailDialog");
  if (!taskDetailDialog.contains(e.target)) {
    taskDetailDialog.close();
  }
});

document.addEventListener("closeTaskDetailDialog", (e) => {
  const taskDetailDialog = document.getElementById("taskDetailDialog");
  const taskDetailDialogForm = taskDetailDialog.querySelector("form");
  taskDetailDialog?.close();
  taskDetailDialogForm?.reset();
});
