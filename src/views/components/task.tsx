import { Task } from "@prisma/client";
import moment from "moment";
import React from "react";
import { DoneSVG, InfoSVG, TrashSVG, UnDoneSVG } from "../assets/svg";
import { twMerge } from "tailwind-merge";

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps): JSX.Element {
  return (
    <li
      id={`task-${task.createdAt.getTime()}`}
      className={twMerge(
        "flex items-center gap-x-2 border-b",
        task.done && "line-through",
      )}
    >
      <span className="w-10 text-center">
        {!!task.startTime ? moment(task.startTime).format("HH:mm") : "--:--"}
      </span>
      <span className="mr-auto">{task.name}</span>
      <button type="button" className="text-xl">
        <InfoSVG />
      </button>
      <button
        type="button"
        className="text-xl"
        hx-put="/task/toggle"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-target={`#task-${task.createdAt.getTime()}`}
        hx-swap="outerHTML"
      >
        {task.done ? <UnDoneSVG /> : <DoneSVG />}
      </button>
      <button
        type="button"
        className="text-xl"
        hx-delete="/task/remove"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-target={`#task-${task.createdAt.getTime()}`}
        hx-swap="outerHTML"
      >
        <TrashSVG />
      </button>
    </li>
  );
}
