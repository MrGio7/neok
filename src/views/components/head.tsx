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
      <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossOrigin="anonymous"
      />
      <script
        src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
        integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0="
        crossOrigin="anonymous"
      />

      <link
        rel="stylesheet"
        href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
      />
      <link rel="stylesheet" href="/css/index.css" />
      <link rel="stylesheet" href="/css/tailwind.css" />
      {children}
    </head>
  );
}
