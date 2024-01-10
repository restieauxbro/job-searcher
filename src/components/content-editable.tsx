"use client";
import React, { FormEvent, forwardRef, useEffect, useRef } from "react";
import { Edit } from "lucide-react";

import { cn } from "@/lib/utils";

const ContentEditable = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h1"> & {
    htmlTag: keyof JSX.IntrinsicElements;
    highlight?: boolean;
    onInput?: (event: FormEvent<HTMLHeadingElement>) => void;
    onBlur?: (value: string) => void;
    onEditFinish?: (value: string) => void;
    defaultValue?: string;
    noLineBreaks?: boolean;
  }
>(
  (
    {
      className,
      htmlTag,
      highlight,
      onInput,
      defaultValue,
      onBlur,
      onEditFinish,
      onKeyDown,
      noLineBreaks,
      ...props
    },
    ref
  ) => {
    const htmlRef = useRef<HTMLElement>(null);
    const innerRef = (ref as React.RefObject<HTMLElement>) || htmlRef;
    const [text, setText] = React.useState(defaultValue);

    useEffect(() => {
      if (highlight && innerRef.current) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(innerRef.current);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, [highlight, innerRef]);

    const handleInput = (e: React.SyntheticEvent) => {
      const target = e.target as HTMLHeadingElement;
      // setText(target.innerText);
      onInput?.(e as any);
    };

    // set text on blur
    const handleBlur = (e: React.SyntheticEvent) => {
      const target = e.target as HTMLHeadingElement;
      setText(target.innerText);
      onEditFinish?.(target.innerText);
      onBlur?.(target.innerText);
    };

    // prevent default on enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (noLineBreaks) {
          e.preventDefault();
          // innerRef.current?.blur()
          // tab to the field after the next that's not necessarily a sibling but that's in the DOM
          const currentField = innerRef.current as HTMLElement;
          const nextNextField = currentField.nextElementSibling as HTMLElement;
          if (nextNextField) {
            nextNextField.focus();
          } // else blur current field
          else {
            currentField.blur();
          }
        }
        if (onKeyDown) onKeyDown(e as any);
      }
    };

    return (
      <div className="group relative">
        <button
          // non focusable
          tabIndex={-1}
          className="absolute -top-10 -left-12 px-4 py-4 text-xs opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
          // highlight when clicked
          onClick={() => {
            if (innerRef.current) {
              const range = document.createRange();
              const sel = window.getSelection();
              range.selectNodeContents(innerRef.current);
              sel?.removeAllRanges();
              sel?.addRange(range);
            }
          }}
        >
          <div className="sr-only">Edit</div>
          <Edit size={16} />
        </button>
        {React.createElement(
          htmlTag,
          {
            className: cn(
              "cursor-pointer inline focus-visible:outline-none",
              className
            ),
            ref: innerRef,
            contentEditable: true,
            ...props,
            onInput: handleInput,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
          },
          text
        )}
      </div>
    );
  }
);

ContentEditable.displayName = "ContentEditable";

export default ContentEditable;
