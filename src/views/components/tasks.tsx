import { Task as TTask } from "@prisma/client";
import React from "react";
import Task from "./task";
import moment from "moment";
import { twMerge } from "tailwind-merge";

interface TasksProps {
  tasks?: TTask[];
  selectedDate?: string;
}

const today = moment().utcOffset("+04:00").format("YYYY-MM-DD");

export default function Tasks({
  tasks = [],
  selectedDate = today,
}: TasksProps): JSX.Element {
  const weekDays = Array.from({ length: 7 }, (_, idx) => {
    const day = moment(selectedDate)
      .utcOffset("+04:00")
      .startOf("week")
      .add(idx + 1, "day");

    return {
      value: day.format("Y-M-D"),
      day: day.format("ddd"),
      date: day.format("MMM DD"),
    };
  });
  return (
    <ul className="flex flex-col gap-y-5 px-5">
      {weekDays.map(({ date, day, value }, idx) => (
        <li key={idx} className="flex flex-col gap-y-2">
          <section
            className={twMerge(
              "flex justify-between border-b-2",
              value === today && "text-cyan-300",
            )}
          >
            <span>{day}</span>
            <span>{date}</span>
          </section>

          <ul id={`tasks_${value}`} className="flex flex-col gap-y-5">
            {tasks
              .filter((task) => task.startDate?.toISOString().startsWith(value))
              .map((task) => (
                <Task key={task.createdAt.getTime()} task={task} />
              ))}

            <form
              className="flex gap-x-2"
              hx-post="/task/add"
              hx-vals={`{"start": "${value}"}`}
            >
              <input
                type="text"
                name="name"
                placeholder="Title"
                className="w-full"
              />
              <button type="submit">Add</button>
              <button className="addTaskDetailsBtn" type="button" value={value}>
                Details
              </button>
            </form>
          </ul>
        </li>
      ))}
    </ul>
  );
}
