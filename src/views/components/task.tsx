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
      id={`task-${task.id}`}
      className={twMerge(
        "flex items-center gap-x-2 border-b border-b-neutral-500",
        task.done && "line-through",
      )}
    >
      <span
        className="w-full cursor-pointer overflow-hidden text-ellipsis"
        hx-get="/task/info"
        hx-vals={`{"id": ${task.id}}`}
      >
        {task.name}
      </span>

      <button
        type="button"
        className="select-none text-2xl focus:bg-transparent"
        hx-put="/task/update"
        hx-vals={`{"id": ${task.id}, "done": ${!task.done}}`}
      >
        {task.done ? <UnDoneSVG /> : <DoneSVG />}
      </button>
    </li>
  );
}
