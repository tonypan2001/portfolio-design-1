import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
};

export function Logo({ className, title = "PanStudio", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${title} logo`}
      className={cn("block", className)}
      fill="currentColor"
      {...props}
    >
      <title>{title}</title>
      {/* Stylized "PS" using text for simplicity; inherits currentColor */}
      <text
        x="0"
        y="29"
        fontFamily="Geist, Segoe UI, Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-1"
      >
        PS
      </text>
    </svg>
  );
}

export default Logo;

