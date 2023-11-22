import { Task } from "@prisma/client";
import moment from "moment";
import React from "react";

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps): JSX.Element {
  return (
    <li id={`task-${task.createdAt.getTime()}`}>
      {!!task.startTime && (
        <span>{moment(task.startTime).format("HH:mm")}</span>
      )}
      <span>{task.name}</span>
      <span>{task.description}</span>
      <span>{task.done ? "ASD" : "QWE"}</span>
      <button
        type="button"
        hx-put="/task/toggle"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-target={`#task-${task.createdAt.getTime()}`}
        hx-swap="outerHTML"
      >
        Toggle
      </button>
      <button
        type="button"
        hx-delete="/task/remove"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-target={`#task-${task.createdAt.getTime()}`}
        hx-swap="outerHTML"
      >
        Delete
      </button>
    </li>
  );
}
