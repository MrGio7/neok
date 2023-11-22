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

export function PlusCircleSVG(props: React.SVGProps<SVGSVGElement>) {
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
        d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

export function DoneSVG(props: React.SVGProps<SVGSVGElement>) {
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
        d="m6 17.3l-4.25-4.25q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l3.55 3.55l1.4 1.4l-.725.7q-.3.275-.7.288T6 17.3Zm5.65 0L7.4 13.05q-.275-.275-.275-.688t.275-.712q.3-.3.713-.3t.712.3l3.525 3.525l8.5-8.5q.3-.3.7-.287t.7.312q.275.3.288.7t-.288.7l-9.2 9.2q-.3.3-.7.3t-.7-.3Zm.7-4.95l-1.425-1.4l4.25-4.25q.275-.275.687-.275t.713.275q.3.3.3.713t-.3.712L12.35 12.35Z"
      />
    </svg>
  );
}

export function UnDoneSVG(props: React.SVGProps<SVGSVGElement>) {
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
        d="m21.125 21.1l-5.9-5.9l-2.15 2.15q-.3.3-.7.3t-.7-.3l-4.25-4.25q-.3-.3-.287-.7t.287-.7q.3-.3.713-.312t.712.287l3.525 3.525l1.4-1.4l-9.65-9.65q-.3-.3-.288-.7t.288-.7q.3-.3.713-.313t.712.288L22.525 19.7q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275Zm-15.1-3.75l-4.25-4.25q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.55 3.55l1.4 1.4l-.7.7q-.3.3-.7.3t-.7-.3Zm12-4.95l-1.4-1.4l4.225-4.225q.275-.275.675-.287t.7.262q.3.275.313.7t-.288.725L18.025 12.4Zm-2.85-2.85l-1.4-1.4l1.45-1.45q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-1.45 1.45Z"
      />
    </svg>
  );
}

export function TrashSVG(props: React.SVGProps<SVGSVGElement>) {
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
        d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7Zm5-7.1l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7l-1.9-1.9l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 11.1l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l1.9-1.9Z"
      />
    </svg>
  );
}

export function InfoSVG(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      />
    </svg>
  );
}
