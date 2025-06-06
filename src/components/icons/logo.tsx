import type { SVGProps } from 'react';

export function InternStarLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      fill="currentColor"
      aria-label="InternStar Logo"
      role="img"
      {...props}
    >
      <text x="0" y="15" fontSize="18" fontWeight="bold" className="fill-primary">
        InternStar
      </text>
    </svg>
  );
}
