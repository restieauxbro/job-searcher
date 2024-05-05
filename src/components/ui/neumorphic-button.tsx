"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export interface NeumorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  baseColor?: string;
  childrenProps?: React.HTMLProps<HTMLSpanElement>;
}

const NeumorphButton: React.FunctionComponent<NeumorphButtonProps> = (
  props
) => {
  const { baseColor, childrenProps, ...buttonProps } = props;

  return (
    <div className="inline-block relative rounded-[0.3125rem] bg-gradient-to-b from-neutral-300/60 to-neutral-100/50 p-[1px]">
      <button
        className="group relative rounded bg-gradient-to-b from-white to-neutral-200 px-4 py-2.5 drop-shadow-lg after:absolute after:inset-[2px] after:rounded after:bg-gradient-to-b after:from-neutral-100 after:to-neutral-50 active:drop-shadow-sm active:after:inset-[3px] active:after:from-neutral-200 active:after:to-neutral-100 transition-all"
        {...buttonProps}
      >
        <div className="relative z-1 flex items-center gap-4 text-neutral-900 group-active:text-neutral-700">
          <span
            className={cn(
              "font-sans font-medium z-[2] relative text-sm flex gap-2 items-center text-neutral-700",
              childrenProps?.className
            )}
          >
            {props.children}
          </span>
        </div>
      </button>
    </div>
  );
};

export const DarkNeumorphButton: React.FunctionComponent<
  NeumorphButtonProps
> = (props) => {
  const { baseColor, ...buttonProps } = props;
  const color = baseColor || "indigo";
  return (
    <div
      className={`inline-block relative rounded-[0.3125rem] bg-gradient-to-b from-indigo-700 to-indigo-600 p-[1px] shadow`}
    >
      <button
        className={`group relative rounded bg-gradient-to-b from-indigo-500 to-indigo-600 active:from-indigo-500 px-4 py-2.5 drop-shadow-lg after:absolute after:inset-[2px] after:rounded after:bg-gradient-to-b after:from-indigo-700 after:to-indigo-500/90 active:drop-shadow-sm active:after:inset-[3px] active:after:from-indigo-800 active:after:to-indigo-500 transition-all active:shadow active:shadow-neutral-800/50`}
        {...buttonProps}
      >
        <div
          className={`relative z-1 flex items-center gap-4 text-indigo-800 group-active:text-indigo-600`}
        >
          <span
            className={`font-sans font-medium z-[2] relative text-sm text-white group-active:scale-[98%]`}
          >
            {props.children}
          </span>
        </div>
      </button>
    </div>
  );
};
export const DarkNeumorphLink = ({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) => {
  return (
    <div
      className={`relative rounded-[0.3125rem] bg-gradient-to-b from-indigo-700 to-indigo-600 p-[1px] shadow`}
    >
      <Link
        href={"href"}
        className={`group relative text-white rounded bg-gradient-to-b from-indigo-500 to-indigo-600 active:from-indigo-500 px-4 py-2.5 drop-shadow-lg after:absolute after:inset-[2px] after:rounded after:bg-gradient-to-b after:from-indigo-700 after:to-indigo-500/90 active:drop-shadow-sm active:after:inset-[3px] active:after:from-indigo-800 active:after:to-indigo-500 transition-all active:shadow active:shadow-neutral-800/50`}
      >
        {/* <div
          className={`relative z-1 flex items-center gap-4 text-indigo-800 group-active:text-indigo-600`}
        >
          <div
            className={`font-sans font-medium z-[2] relative text-sm text-white group-active:scale-[98%]`}
          > */}
        {children}
        {/* </div>
        </div> */}
      </Link>
    </div>
  );
};

export default NeumorphButton;
