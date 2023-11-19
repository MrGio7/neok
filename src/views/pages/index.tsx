import AddTaskForm from "@components/addTaskForm";
import Body from "@components/body";
import Head from "@components/head";
import Header from "@components/header";
import Tasks from "@components/tasks";
import { Task } from "@prisma/client";
import React from "react";
import { PlusCircleSVG } from "../assets/svg";

interface IndexProps {
  tasks: Task[];
  username: string;
}

export default function Index({ tasks, username }: IndexProps): JSX.Element {
  return (
    <html lang="en">
      <Head />
      <Body>
        <Header username={username} />

        <dialog
          id="addTaskFormDialog"
          className="rounded bg-cyan-950 p-5 backdrop:bg-cyan-950 backdrop:bg-opacity-75 dark:bg-cyan-50"
        >
          <AddTaskForm />
        </dialog>
        <Tasks tasks={tasks} />
        <PlusCircleSVG
          id="showAddTaskFormBtn"
          className="fixed bottom-2 right-2 cursor-pointer text-6xl text-cyan-900 transition-transform hover:scale-105 active:scale-110 dark:text-cyan-100"
        />
      </Body>
    </html>
  );
}
