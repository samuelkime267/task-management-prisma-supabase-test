import React from "react";

export default function Plus(props: React.SVGProps<SVGSVGElement>) {
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
        d="M18 12H12M12 12H6M12 12V6M12 12V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
