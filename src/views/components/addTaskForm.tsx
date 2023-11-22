import React from "react";
import Input from "./input";

interface AddTaskFormProps {}

export default function AddTaskForm({}: AddTaskFormProps) {
  return (
    <form
      id="addTaskForm"
      className="flex flex-col gap-y-2 text-cyan-50 dark:text-cyan-950"
      hx-post="/task/add"
    >
      <Input type="text" name="name" id="name" label="Name" />
      <Input type="text" name="description" label="Description" />
      <Input
        type="datetime-local"
        id="addTaskFormStartDate"
        name="start"
        label="Start Date"
      />
      <Input type="datetime-local" name="end" label="Start Date" />
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
