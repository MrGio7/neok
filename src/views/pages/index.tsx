import Body from "@components/body";
import Head from "@components/head";
import Header from "@components/header";
import TaskDetailDialog from "@components/taskDetailDialog";
import Tasks from "@components/tasks";
import { Task } from "@prisma/client";
import React from "react";
import { User } from "src/app";

interface IndexProps {
  tasks: Task[];
  user: User;
  selectedDate: Date;
}

export default function Index({
  tasks,
  user,
  selectedDate,
}: IndexProps): JSX.Element {
  return (
    <html lang="en">
      <Head />
      <Body>
        <Header user={user} selectedDate={selectedDate} />

        <main className="mt-7 text-xl">
          <Tasks tasks={tasks} user={user} selectedDate={selectedDate} />

          <TaskDetailDialog user={user} />
        </main>
      </Body>
    </html>
  );
}
