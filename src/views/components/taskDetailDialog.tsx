import { Task } from "@prisma/client";
import React from "react";
import DateInput from "./DateInput";
import Input from "./input";
import { User } from "src/app";

interface TaskDetailDialogProps {
  task?: Task;
  user: User;
}

export default function TaskDetailDialog({
  task,
  user,
}: TaskDetailDialogProps) {
  if (!task) return <dialog id="taskDetailDialog" />;

  return (
    <dialog
      id="taskDetailDialog"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-neutral-100 p-5 shadow shadow-neutral-950 dark:bg-neutral-100"
      open
    >
      <form
        className="flex flex-col gap-y-1"
        hx-put="/task/update"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-on="htmx:configRequest:
          const start = this.querySelector('input[name=start]').value;
          const end = this.querySelector('input[name=end]').value;

          !start && delete event.detail.parameters.start;
          !end && delete event.detail.parameters.end;

          !!start && (event.detail.parameters.start = new Date(start).toISOString());
          !!end && (event.detail.parameters.end = new Date(end).toISOString());
        "
      >
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Enter name"
          defaultValue={task.name}
        />
        <Input
          type="text"
          name="description"
          label="Description"
          placeholder="Enter description"
          defaultValue={task.description || ""}
        />
        <DateInput
          type="datetime-local"
          name="start"
          label="Start"
          defaultValue={task.start || undefined}
          format={{
            dateStyle: "medium",
            timeStyle: "short",
            hour12: false,
            timeZone: user.timezone,
          }}
        />
        <DateInput
          type="datetime-local"
          label="End"
          name="end"
          defaultValue={task.end || undefined}
          format={{
            dateStyle: "medium",
            timeStyle: "short",
            hour12: false,
            timeZone: user.timezone,
          }}
        />
        <button
          type="submit"
          className="mt-2 rounded bg-neutral-100 px-2 py-1 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50"
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
