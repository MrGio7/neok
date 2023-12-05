import { Task } from "@prisma/client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { DoneSVG, UnDoneSVG } from "../assets/svg";
import { User } from "src/app";

interface TaskProps {
  task: Task;
  user: User;
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
      <span
        className="w-10 shrink-0 cursor-pointer text-center"
        hx-get="/task/info"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
      >
        {!!task.start
          ? task.start.toLocaleTimeString("en", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "--:--"}
      </span>

      <span
        className="w-full cursor-pointer overflow-hidden text-ellipsis"
        hx-get="/task/info"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
      >
        {task.name}
      </span>

      <button
        type="button"
        className="text-2xl"
        hx-put="/task/toggle"
        hx-vals={`{"createdAt": "${task.createdAt.getTime()}"}`}
        hx-target={`#task-${task.createdAt.getTime()}`}
        hx-swap="outerHTML"
      >
        {task.done ? <UnDoneSVG /> : <DoneSVG />}
      </button>
    </li>
  );
}
