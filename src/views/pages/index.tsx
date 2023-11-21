import AddTaskForm from "@components/addTaskForm";
import Body from "@components/body";
import Head from "@components/head";
import Header from "@components/header";
import Tasks from "@components/tasks";
import { Task } from "@prisma/client";
import React from "react";

interface IndexProps {
  tasks: Task[];
  username: string;
  date: string;
}

export default function Index({
  tasks,
  username,
  date,
}: IndexProps): JSX.Element {
  return (
    <html lang="en">
      <Head />
      <Body>
        <Header username={username} date={date} />
        <Tasks tasks={tasks} selectedDate={date} />
        <AddTaskForm />
      </Body>
    </html>
  );
}
