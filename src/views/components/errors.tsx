import React from "react";
import Error from "./error";

interface ErrorsProps {
  errors?: string[];
}

export default function Errors({ errors = [] }: ErrorsProps) {
  return (
    <ul id="errors" className="absolute right-5 top-5 flex flex-col">
      {errors.map((error, idx) => (
        <Error key={idx} error={error} />
      ))}
    </ul>
  );
}
