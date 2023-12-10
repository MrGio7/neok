import { Task as TTask } from "@prisma/client";
import React from "react";
import { User } from "src/app";
import Input from "./input";
import Task from "./task";

interface TasksProps {
  tasks?: TTask[];
  selectedDate: Date;
  user: User;
}

export default function Tasks({
  tasks = [],
  selectedDate,
  user,
}: TasksProps): JSX.Element {
  const weekDays = Array.from({ length: 7 }, (_, idx) => {
    const dayOfWeek = new Date(selectedDate).getDay();
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - dayOfWeek + idx);

    return date;
  });

  return (
    <ul className="flex select-none flex-col gap-y-8 px-5">
      {weekDays.map((date, idx) => (
        <li key={idx} className="flex flex-col gap-y-5">
          <section className="flex justify-between border-b-2">
            <span className="text-lg italic">
              {date.toLocaleDateString("en", {
                month: "short",
                day: "numeric",
                timeZone: user.timezone,
              })}
            </span>
            <span className="text-neutral-500">
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
            className="flex flex-col gap-y-5 empty:hidden"
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
            className="m-0 border-b border-b-neutral-500"
            hx-post="/task/add"
            hx-vals={`{"start": "${date.toISOString()}"}`}
            hx-on="
              htmx:afterRequest:
                const input = this.querySelector('input');
                input.value = ''
            "
          >
            <Input
              type="text"
              name="name"
              placeholder="Add New Task"
              className="h-7 placeholder:text-neutral-500"
              containerProps={{ className: "w-full" }}
            />
          </form>
        </li>
      ))}
    </ul>
  );
}
