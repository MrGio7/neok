import Body from "@components/body";
import Head from "@components/head";
import Tasks from "@components/tasks";
import { Task } from "@prisma/client";
import React from "react";

interface IndexProps {
  tasks: Task[];
}

export default function Index({ tasks }: IndexProps): JSX.Element {
  return (
    <html lang="en">
      <Head />
      <Body>
        <form
          hx-post="/task/add"
          hx-target="#tasks"
          hx-target-error="#error"
          hx-swap="afterbegin"
        >
          <input type="text" name="name" id="name" />
          <input type="text" name="description" id="description" />
          <button
            type="submit"
            className="hover:bg-teal-200"
            data-loading-class="bg-red-100 hover:bg-red-200"
            data-loading-class-remove="bg-teal-100 hover:bg-teal-200"
            data-loading-disable
          >
            Add
          </button>
        </form>
        <Tasks tasks={tasks} />
      </Body>
    </html>
  );
}
