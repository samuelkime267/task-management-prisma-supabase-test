import React from "react";

export default function Stop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 16V8C6 7.45 6.196 6.97933 6.588 6.588C6.98 6.19667 7.45067 6.00067 8 6H16C16.55 6 17.021 6.196 17.413 6.588C17.805 6.98 18.0007 7.45067 18 8V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H8C7.45 18 6.97933 17.8043 6.588 17.413C6.19667 17.0217 6.00067 16.5507 6 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
