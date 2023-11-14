import React from "react";

export function BurgerClosedSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 9H3s0-6 9-6s9 6 9 6m-7.65 8H3v1c0 1.66 1.34 3 3 3h7.35c-.22-.63-.35-1.3-.35-2s.13-1.37.35-2m8.51-3.27A2 2 0 0 0 20 11h-9l-2.5 2L6 11H4c-1.1 0-2 .9-2 2s.9 2 2 2h10.54c1.1-1.22 2.69-2 4.46-2c1.04 0 2 .26 2.86.73M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3Z"
      />
    </svg>
  );
}

export function BurgerOpenedSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 9H3s0-6 9-6s9 6 9 6m-7.65 8H3v1c0 1.66 1.34 3 3 3h7.35c-.22-.63-.35-1.3-.35-2s.13-1.37.35-2m8.51-3.27A2 2 0 0 0 20 11h-9l-2.5 2L6 11H4c-1.1 0-2 .9-2 2s.9 2 2 2h10.54c1.1-1.22 2.69-2 4.46-2c1.04 0 2 .26 2.86.73m.68 3.15l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19l2.13-2.12Z"
      />
    </svg>
  );
}

export function AccountSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"
      />
    </svg>
  );
}
