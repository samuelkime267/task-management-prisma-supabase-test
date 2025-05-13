import React from "react";

export default function Create(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 4.5H5.5C4.96957 4.5 4.46086 4.71071 4.08579 5.08579C3.71071 5.46086 3.5 5.96957 3.5 6.5V15.5C3.5 16.0304 3.71071 16.5391 4.08579 16.9142C4.46086 17.2893 4.96957 17.5 5.5 17.5H15.5C16.0304 17.5 16.5391 17.2893 16.9142 16.9142C17.2893 16.5391 17.5 16.0304 17.5 15.5V11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 5.50001L16.453 6.50001M17.5 3.46701C17.7671 3.74242 17.915 4.11188 17.9118 4.4955C17.9086 4.87912 17.7546 5.24607 17.483 5.51701L10.5 12.5L7.5 13.5L8.5 10.5L15.487 3.45401C15.7327 3.20669 16.0614 3.05919 16.4095 3.03998C16.7576 3.02078 17.1005 3.13123 17.372 3.35001L17.5 3.46701Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
