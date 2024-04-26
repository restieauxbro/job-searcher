"use client";
import FileUpload from "@/components/ui/file-upload";
import NeumorphButton from "@/components/ui/neumorphic-button";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter();

  // post file to server /api/parse-pdf
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);

    // if the file ends im .pdf, send it to /api/parse-pdf

    const response = await fetch("/api/upload-file-to-openai", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully");
    } else {
      console.error("Failed to upload file");
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
