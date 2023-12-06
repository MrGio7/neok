import React from "react";
import Message from "./message";

interface MessagesProps {}

export default function Messages({}: MessagesProps) {
  return (
    <ul
      id="messages"
      className="absolute right-5 top-5 flex flex-col gap-y-2"
    />
  );
}
