import { cn } from "@/lib/utils";
import React from "react";
import { neutral } from "tailwindcss/colors";

const Divider = ({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      height="1"
      width="100%"
      className={cn("w-full mt-3", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        style={{ stroke: color || neutral[300], strokeWidth: 0.5 }}
      />
    </svg>
  );
};

export default Divider;
