"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import NeumorphButton from "@/components/ui/neumorphic-button";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <NeumorphButton {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </NeumorphButton>
  );
}
