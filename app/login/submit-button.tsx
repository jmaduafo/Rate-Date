"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import Loading from "@/components/Loading";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending} className="rounded-xl w-full bg-darkText text-myForeground font-medium outline-none py-2">
      {isPending ? <Loading/> : children}
    </button>
  );
}
