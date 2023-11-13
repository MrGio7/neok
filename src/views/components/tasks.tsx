import { Task as TTask } from "@prisma/client";
import React from "react";
import Task from "./task";

interface TasksProps {
  tasks: TTask[];
}

export default function Tasks({ tasks }: TasksProps): JSX.Element {
  return (
    <ul id="tasks">
      {tasks.map((task) => (
        <Task key={task.createdAt.getTime()} task={task} />
      ))}
    </ul>
  );
}
