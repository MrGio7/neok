import React from "react";

interface HeadProps {
  children?: React.ReactNode;
}

export default function Head({ children }: HeadProps) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HTMX Demo</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.7"
        integrity="sha384-EAzY246d6BpbWR7sQ8+WEm40J8c3dHFsqC58IgPlh4kMbRRI6P6WA+LA/qGAyAu8"
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
