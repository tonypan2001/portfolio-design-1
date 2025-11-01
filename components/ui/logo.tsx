import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  title?: string;
};

export function Logo({ className, title = "PanStudio", ...props }: LogoProps) {
  return (
    <img
      src="/icon.svg"
      alt={`${title} logo`}
      aria-label={`${title} logo`}
      className={cn("block", className)}
      {...props}
    />
  );
}

export default Logo;
