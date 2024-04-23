import { Button } from "@/components/ui/button";
import * as React from "react";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full grid place-items-center border-b p-1">
        <div className="flex gap-8 flex-wrap">
          {["Style", "Import your CV", "Edit"].map((item, index) => (
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-neutral-500 text-xs"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-lvh grid place-items-center overflow-hidden pt-8">
        {props.children}
      </div>
    </div>
  );
}
