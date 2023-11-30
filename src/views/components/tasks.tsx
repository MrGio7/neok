import { Task as TTask } from "@prisma/client";
import React from "react";
import { User } from "src/app";
import { AddSVG } from "../assets/svg";
import Task from "./task";

interface TasksProps {
  tasks?: TTask[];
  selectedDate?: Date;
  user: User;
}

export default function Tasks({
  tasks = [],
  selectedDate,
  user,
}: TasksProps): JSX.Element {
  const weekDays = Array.from({ length: 7 }, (_, idx) => {
    const dayOfWeek = new Date().getDay();
    const date = new Date();
    date.setDate(date.getDate() - dayOfWeek + idx);

    return date;
  });

  return (
    <ul className="flex flex-col gap-y-5 px-5">
      {weekDays.map((date, idx) => (
        <li key={idx} className="flex flex-col gap-y-2">
          <section className="flex justify-between border-b-2">
            <span>
              {date.toLocaleDateString("en", {
                month: "short",
                day: "numeric",
                timeZone: user.timezone,
              })}
            </span>
            <span>
              {date.toLocaleDateString("en", {
                weekday: "short",
                timeZone: user.timezone,
              })}
            </span>
          </section>

          <ul
            id={`tasks_${date.toLocaleDateString("sv", {
              timeZone: user.timezone,
            })}`}
            className="flex flex-col gap-y-5"
          >
            {tasks
              .filter(
                (task) => task.date.toDateString() === date.toDateString(),
              )
              .map((task) => (
                <Task key={task.createdAt.getTime()} task={task} user={user} />
              ))}
          </ul>
          <form
            className="flex gap-x-1 border-b"
            hx-post="/task/add"
            hx-vals={`{"start": "${date.toISOString()}"}`}
          >
            <input
              type="text"
              name="name"
              placeholder="Add New Task"
              className="w-full rounded outline-none dark:bg-cyan-950"
            />
            <button type="submit" className="text-3xl">
              <AddSVG />
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
