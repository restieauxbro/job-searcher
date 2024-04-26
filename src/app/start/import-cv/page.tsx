"use client";
import { PDFUploadResponse } from "@/app/api/upload-file-to-openai/route";
import FileUpload from "@/components/ui/file-upload";
import NeumorphButton from "@/components/ui/neumorphic-button";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { extractTextFromFileWithAssistant } from "./actions";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);

  // post file to server /api/parse-pdf
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);
    try {
      // const response = (await fetch("/api/upload-file-to-openai", {
      //   method: "POST",
      //   body: formData,
      // })) as unknown as PDFUploadResponse | undefined;
      await extractTextFromFileWithAssistant(file.name, "pdf");
    } catch (error) {
      console.error("Failed to upload file", error);
    }
  };

  return (
    <div>
      <div className="text-center max-w-md">
        <h1 className="font-extrabold text-4xl max-w-xl text-neutral-800 text-balance leading-tighter tracking-tight">
          Do you have a CV to customize?
        </h1>
        <p className="mt-8 mx-auto text-balance text-neutral-700">
          We can customize your current CV or you can start from scratch.
        </p>
        <div className="mt-8">
          <FileUpload handleFileChange={handleFileChange} />
{/* 
          <NeumorphButton
            onClick={() =>
              extractTextFromFileWithAssistant(
                "file-cFgTAd0s5cf6AseARu89wXS3",
                "pdf"
              )
            }
          >
            Test assistant{" "}
          </NeumorphButton> */}
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
