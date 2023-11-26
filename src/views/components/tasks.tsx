import { Task as TTask } from "@prisma/client";
import React from "react";
import Task from "./task";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { AddSVG } from "../assets/svg";

interface TasksProps {
  tasks?: TTask[];
  selectedDate?: string;
}

const today = moment().tz("Asia/Tbilisi").format("YYYY-MM-DD");

export default function Tasks({
  tasks = [],
  selectedDate = today,
}: TasksProps): JSX.Element {
  const weekDays = Array.from({ length: 7 }, (_, idx) => {
    const day = moment(selectedDate)
      .tz("Asia/Tbilisi")
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
          </ul>
          <form
            className="flex gap-x-1 border-b"
            hx-post="/task/add"
            hx-vals={`{"start": "${value}"}`}
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
