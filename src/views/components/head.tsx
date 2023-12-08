import React from "react";

interface HeadProps {
  children?: React.ReactNode;
}

export default function Head({ children }: HeadProps) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>NEOK</title>

      <script
        src="https://unpkg.com/htmx.org@1.9.9"
        integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
        crossOrigin="anonymous"
      />
      <script src="https://unpkg.com/htmx.org/dist/ext/loading-states.js" />
      <script src="https://unpkg.com/htmx.org/dist/ext/remove-me.js" />

      <link rel="stylesheet" href="/css/index.css" />
      <link rel="stylesheet" href="/css/tailwind.css" />
      {children}
    </head>
  );
}
