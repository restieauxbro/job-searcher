"use client";
import * as React from "react";

export interface NeumorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  baseColor?: string;
}

const NeumorphButton: React.FunctionComponent<NeumorphButtonProps> = (
  props
) => {
  const { baseColor, ...buttonProps } = props;

  return (
    <div className="relative rounded-[0.3125rem] bg-gradient-to-b from-neutral-300/60 to-neutral-100/50 p-[1px]">
      <button
        className="group relative rounded bg-gradient-to-b from-white to-neutral-200 px-4 py-2.5 drop-shadow-lg after:absolute after:inset-[2px] after:rounded after:bg-gradient-to-b after:from-neutral-100 after:to-neutral-50 active:drop-shadow-sm active:after:inset-[3px] active:after:from-neutral-200 active:after:to-neutral-100 transition-all"
        {...buttonProps}
      >
        <div className="relative z-1 flex items-center gap-4 text-neutral-900 group-active:text-neutral-700">
          <span className="font-sans font-medium z-[2] relative text-sm">
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
  const color = baseColor || "purple";
  return (
    <div
      className={`relative rounded-[0.3125rem] bg-gradient-to-b from-purple-800 to-purple-700 p-[1px] shadow`}
    >
      <button
        className={`group relative rounded bg-gradient-to-b from-purple-600 to-purple-700 active:from-purple-600 px-4 py-2.5 drop-shadow-lg after:absolute after:inset-[2px] after:rounded after:bg-gradient-to-b after:from-purple-800 after:to-purple-600/90 active:drop-shadow-sm active:after:inset-[3px] active:after:from-purple-900 active:after:to-purple-600 transition-all active:shadow active:shadow-neutral-900/50`}
        {...buttonProps}
      >
        <div
          className={`relative z-1 flex items-center gap-4 text-purple-900 group-active:text-purple-700`}
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

export default NeumorphButton;
