"use client";
import DefaultCV from "@/components/cv-components/DefaultCV";
import NeumorphButton, {
  DarkNeumorphButton,
} from "@/components/ui/neumorphic-button";
import { aIEngineeringTemplate } from "@/cv-templates/ai-engineer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="grid place-items-center min-h-[calc(100lvh-8rem)] pt-16">
      <div className="text-center mt-16">
        <h1 className="font-extrabold text-4xl max-w-xl text-neutral-800 leading-tight tracking-tight">
          {"Let's start with a basic style"}
        </h1>
        <p className="mt-8 max-w-md text-balance text-neutral-700">
          {
            "This is a simple layout to get you started. It'll look a little something like this."
          }
        </p>
      </div>
      <div>
        <div className="max-w-[576px] flex justify-between my-8 mx-auto">
          {/* <NeumorphButton onClick={() => {}}>Back</NeumorphButton> */}
          <div />
          <Link href={`${pathname}/import-cv`}>
            <DarkNeumorphButton>Next</DarkNeumorphButton>
          </Link>
        </div>
        <div className="shadow-md shadow-neutral-300 bg-white py-10 px-20 w-screen max-w-screen-md rounded-md border border-neutral-300 max-h-[60rem] overflow-y-auto scale-75 origin-top">
          <DefaultCV cvTemplate={aIEngineeringTemplate} />
        </div>
      </div>
    </div>
  );
}
