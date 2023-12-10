import { Task, User as TUser } from "@prisma/client";
import React from "react";
import DateInput from "./DateInput";
import Input from "./input";
import { User } from "src/app";
import SearchFriend from "./searchFriend";

interface TaskDetailDialogProps {
  task?: Task & { AttachedUsers: TUser[] };
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
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-neutral-100/90 p-5 shadow shadow-neutral-950"
      open
    >
      <form
        className="m-0 flex flex-col gap-y-3"
        hx-put="/task/update"
        hx-vals={`{"id": ${task.id}}`}
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
          defaultValue={task.name}
          className="bg-transparent text-neutral-900"
          containerProps={{
            className: "border-b border-neutral-500",
          }}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          defaultValue={task.description || ""}
          className="bg-transparent text-neutral-900"
          containerProps={{
            className: "border-b border-neutral-500",
          }}
        />

        <SearchFriend
          friends={task.AttachedUsers?.map(({ username }) => username).join(
            ", ",
          )}
        />

        <fieldset className="mt-5 flex w-full items-center gap-x-2">
          <button type="button" hx-delete="/task/remove">
            <img src="/svg/trashCan.svg" alt="delete icon" className="w-10" />
          </button>

          <button
            type="submit"
            className="w-full rounded bg-neutral-700 px-2 py-1 text-neutral-50"
            data-loading-disable
          >
            Save
          </button>
        </fieldset>
      </form>
    </dialog>
  );
}
