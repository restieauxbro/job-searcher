"use client";
import FileUpload from "@/components/ui/file-upload";
import NeumorphButton from "@/components/ui/neumorphic-button";
import { Message, useAssistant } from "ai/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter();
  return (
    <div>
      <div className="text-center max-w-md">
        <h1 className="font-bold text-4xl max-w-xl text-neutral-800 text-balance">
          Do you have a CV to customize?
        </h1>
        <p className="mt-8 mx-auto text-balance text-neutral-700">
          We can customize your current CV or you can start from scratch.
        </p>
        <div className="mt-8">
          <FileUpload />

          <div className="my-8 flex gap-4 items-center text-sm">
            <hr className="grow" />
            Or
            <hr className="grow" />
          </div>
          <div className="flex justify-center">
            <NeumorphButton onClick={() => router.push(`/start/write`)}>
              <Edit size={16} /> Write from scratch
            </NeumorphButton>
          </div>
        </div>
      </div>
    </div>
  );
}
