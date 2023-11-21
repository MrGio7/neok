import React from "react";
import Input from "./input";

interface AddTaskFormProps {}

export default function AddTaskForm({}: AddTaskFormProps) {
  return (
    <form
      hx-post="/task/add"
      hx-target="#tasks"
      hx-target-error="#error"
      hx-swap="afterbegin"
      id="addTaskForm"
      className="flex flex-col gap-y-2 text-cyan-50 dark:text-cyan-950"
      style={{
        display: "none",
      }}
    >
      <Input type="text" name="name" id="name" label="Name" />
      <Input
        type="text"
        name="description"
        id="description"
        label="Description"
      />
      <Input
        type="text"
        id="taskStartDate"
        name="taskStartDate"
        label="Start Date"
      />
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
  );
}
