import { Task } from "@prisma/client";
import React from "react";
import DateInput from "./DateInput";
import Input from "./input";

interface TaskDetailDialogProps {
  task?: Task;
}

export default function TaskDetailDialog({ task }: TaskDetailDialogProps) {
  if (!task) return <dialog id="taskDetailDialog" />;

  return (
    <dialog
      id="taskDetailDialog"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded p-5 dark:bg-cyan-50"
      open
    >
      <form
        className="flex flex-col gap-y-3"
        hx-put="/task/update"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-on="htmx:configRequest:
          const start = this.querySelector('input[name=start]').value;
          const end = this.querySelector('input[name=end]').value;
          
          event.detail.parameters.start = new Date(start).toISOString();
          event.detail.parameters.end = new Date(end).toISOString();
        "
      >
        <Input type="text" name="name" label="Name" defaultValue={task.name} />
        <Input
          type="text"
          label="Description"
          name="description"
          defaultValue={task.description || ""}
        />
        <DateInput
          type="datetime-local"
          name="start"
          defaultValue={
            task.startDate?.toISOString().split("T")[0] +
            "T" +
            task.startTime?.toISOString().split("T")[1]
          }
          dateFormat="YYYY-MM-DDTHH:mm"
        />
        <DateInput
          type="datetime-local"
          name="end"
          defaultValue={task.endDate?.toISOString()}
          dateFormat="YYYY-MM-DDTHH:mm"
        />
        <button
          type="submit"
          className="mt-2 rounded bg-cyan-50 px-2 py-1 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50"
          data-loading-class="bg-red-100 hover:bg-red-200"
          data-loading-class-remove="bg-teal-100 hover:bg-teal-200"
          data-loading-disable
        >
          Save
        </button>
      </form>
    </dialog>
  );
}
