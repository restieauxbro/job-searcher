"use client";
import FileUpload from "@/components/ui/file-upload";
import NeumorphButton from "@/components/ui/neumorphic-button";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ProcessingState,
  StreamState,
  extractTextFromFileWithAssistant,
} from "./actions";
import { readStreamableValue } from "ai/rsc";
import AnimateFromHidden from "@/components/animations/AnimateFromHidden";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { neutral } from "tailwindcss/colors";
import DefaultCV from "@/components/cv-components/DefaultCV";
import { aIEngineeringTemplate } from "@/cv-templates/ai-engineer";
import ResizingContainer from "@/components/animations/resizing-container";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter();

  const [streamState, setStreamState] = useState<StreamState>({
    state: "idle",
    messages: [
      {
        id: "607ef75c-de22-46d2-8c90-6100715d5470",
        content:
          'import fitz  # PyMuPDF\n\n# Function to extract text from a PDF file using PyMuPDF\ndef extract_text_from_pdf(pdf_path):\n    text = ""\n    try:\n        doc = fitz.open(pdf_path)\n        for page_num in range(doc.page_count):\n            page = doc[page_num]',
        type: "code input",
      },
      {
        id: "607ef75c-de22-46d2-8c90-6100715d5470",
        content:
          'import fitz  # PyMuPDF\n\n# Function to extract text from a PDF file using PyMuPDF\ndef extract_text_from_pdf(pdf_path):\n    text = ""\n    try:\n        doc = fitz.open(pdf_path)\n        for page_num in range(doc.page_count):\n            page = doc[page_num]',
        type: "code input",
      },
    ],
  });

  const state = streamState.state;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("files", file);
    try {
      const streamingVal = await extractTextFromFileWithAssistant(formData);
      for await (const v of readStreamableValue(streamingVal)) {
        console.log(v?.messages);
        v && setStreamState(v);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid place-items-center">
      <AnimateFromHidden
        show={
          //  false
          ["idle", "uploading"].some((s) => s === state)
        }
        animateOnMount={false}
      >
        <div className="text-center max-w-md py-4">
          <h1 className="font-extrabold text-4xl max-w-xl text-neutral-800 text-balance leading-tighter tracking-tight">
            Do you have a CV to customize?
          </h1>
          <p className="mt-8 mx-auto text-balance text-neutral-700">
            We can customize your current CV or you can start from scratch.
          </p>
          {/* <NeumorphButton onClick={() => setLoading(!loading)}>load</NeumorphButton> */}
          <div className="mt-8">
            <FileUpload handleFileChange={handleFileChange} loading={loading} />

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
      </AnimateFromHidden>
      <AnimateFromHidden
        show={
          true
          // state === "processing with ai"
        }
      >
        <div className="p-4 min-h-[20rem]">
          <div className="flex items-center relative">
            <div className="bg-white aspect-[10/14] w-screen max-w-sm border-2 rounded-lg shadow-md p-8">
              <div className="text-2xl lg:text-3xl w-12 leading-none text-balance font-bold text-neutral-400">
                Your document
              </div>
            </div>
            <div className="flex w-[24rem] relative">
              <div className="w-1/2 h-0.5 bg-purple-500"></div>
              <div className="grow h-0.5 bg-neutral-300"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="bg-white size-6 grid place-items-center rounded-full border-[2px] border-purple-300">
                  <div className="loading-spinner bg-purple-500 w-4 p-0.5"></div>
                </div>
              </div>
            </div>
            <div className="bg-white aspect-[10/14] w-screen max-w-sm border-2 rounded-lg shadow-md overflow-hidden p-8 px-12">
              <div className="scale-[65%] w-[29rem] origin-top-left">
                <DefaultCV cvTemplate={aIEngineeringTemplate} />
              </div>
              <div className="w-screen max-w-md absolute bottom-[57%] left-1/2 -translate-x-1/2 ">
                <LayoutGroup>
                  <AnimatePresence>
                    {streamState.messages.map((m) => (
                      <motion.div
                        key={m.id}
                        exit={{
                          opacity: 0,
                          y: 40,
                          scale: 0.95,
                          backgroundColor: neutral[300],
                          transition: { duration: 0.2 },
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        layout
                        className="absolute bottom-0 mt-4 mx-auto bg-neutral-50 border border-purple-300 rounded-lg p-2 text-left text-neutral-700 origin-top w-full shadow"
                      >
                        <ResizingContainer className="w-full" heightOnly>
                          {m.type === "text" ? (
                            <div className="p-6">
                              {controlEndSequence(m.content)}
                            </div>
                          ) : (
                            <CodeBlock code={m.content} />
                          )}
                        </ResizingContainer>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </LayoutGroup>
              </div>
            </div>
          </div>

          {/* <div className="mt-4 mx-auto relative bg-neutral-100 rounded-lg p-2 text-left text-neutral-700">
            <CodeBlock
              code={`import fitz  # PyMuPDF\n\n# Function to extract text from a PDF file using PyMuPDF\ndef extract_text_from_pdf(pdf_path):\n    text = \"\"\n    try:\n        doc = fitz.open(pdf_path)\n        for page_num in range(doc.page_count):\n            page = doc[page_num]`}
            />
          </div> */}
        </div>
      </AnimateFromHidden>
    </div>
  );
}

const controlEndSequence = (string: string) => {
  if (string.includes("I have successfully extracted the text")) {
    const newString =
      string.split("I have successfully extracted the text")[0] +
      "I have successfully extracted the text.";
    return newString;
  } else return string;
};

interface CodeBlockProps {
  code: string;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="text-xs p-2">
      <div className="scale-[40%] origin-top-right m-3 mt-3.5 mr-3.5 absolute top-0 right-0">
        <div className="loading-spinner bg-purple-500 w-8"></div>
      </div>
      <div className="text-purple-700 mb-2">Running code</div>
      <pre className="bg-neutral-200 rounded-md p-4 overflow-hidden max-h-20 flex flex-col-reverse">
        <code>
          {code.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};
