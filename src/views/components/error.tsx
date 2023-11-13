import React from "react";

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return <li className="whitespace-pre-wrap bg-cyan-100">{error}</li>;
}
