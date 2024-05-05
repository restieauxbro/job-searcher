"use client";
import FileUpload from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  extractTextFromFileWithAssistant,
  parseTextToCVWithClaude,
} from "./actions";
import { readStreamableValue } from "ai/rsc";
import AnimateFromHidden from "@/components/animations/AnimateFromHidden";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { neutral } from "tailwindcss/colors";
import ResizingContainer from "@/components/animations/resizing-container";
import { StreamState } from "./types";
import { JsonMessage } from "@/lib/streaming";
import { CVTemplate } from "@/cv-templates/base-template";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter();

  const [claudeParseState, setClaudeParseState] = useState<JsonMessage[]>([]);
  const claudeJSONContent = (claudeParseState[0]?.content || {}) as
    | {
        isCV: true;
        documentType: "cv";
        cv: CVTemplate;
      }
    | {
        isCV: false;
        documentType: string;
        errorMessage: string;
      };
  const cvTemplate = claudeJSONContent.isCV ? claudeJSONContent.cv : {};

  const handleClaudeParse = async (string: string) => {
    try {
      const streamingVal = await parseTextToCVWithClaude(string);
      for await (const v of readStreamableValue(streamingVal)) {
        if (v) {
          const justJsonMessages = v.filter(
            (x) => x.type === "json"
          ) as JsonMessage[];
          console.log({ streamingVal }, { justJsonMessages });
          if (justJsonMessages.length > 0)
            setClaudeParseState(justJsonMessages);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [streamState, setStreamState] = useState<StreamState>({
    state: "idle",
    messages: [
      // {
      //   id: "607ef75c-de22-46d2-8c90-6100715d5470",
      //   content:
      //     'import fitz  # PyMuPDF\n\n# Function to extract text from a PDF file using PyMuPDF\ndef extract_text_from_pdf(pdf_path):\n    text = ""\n    try:\n        doc = fitz.open(pdf_path)\n        for page_num in range(doc.page_count):\n            page = doc[page_num] import fitz  # PyMuPDF\n\n# Function to extract text from a PDF file using PyMuPDF\ndef extract_text_from_pdf(pdf_path):\n    text = ""\n    try:\n        doc = fitz.open(pdf_path)\n        for page_num in range(doc.page_count):\n            page = doc[page_num]',
      //   type: "text",
      // },
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
  useEffect(() => {
    if (streamState.documentText) {
      handleClaudeParse(streamState.documentText);
      setTimeout(() => {
        setStreamState({
          ...streamState,
          messages: [
            {
              type: "text",
              id: "607ef75c-de22-46d2-8c90-6100715d5470",
              content: "Now let's parse your document",
            },
          ],
        });
      }, 1000);
    }
  }, [streamState.documentText]);

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
            {/* <div className="my-8 flex gap-4 items-center text-sm">
              <hr className="grow" />
              Or
              <hr className="grow" />
            </div>
            <div className="flex justify-center">
              <NeumorphButton onClick={() => router.push(`/start/write`)}>
                <Edit size={16} /> Write from scratch
              </NeumorphButton>
            </div>*/}
          </div>
        </div>
      </AnimateFromHidden>
      <AnimateFromHidden
        show={
          // true
          state === "processing with ai"
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
            <div className="bg-white aspect-[10/14] w-screen max-w-sm border-2 rounded-lg shadow-md p-8 px-12">
              <div className="overflow-hidden h-full text-[8px] flex flex-col-reverse">
                {/* <div className="scale-[65%] w-[29rem] origin-top-left"> */}
                {/* <DefaultCV cvTemplate={cvTemplate} /> */}
                {JSON.stringify(cvTemplate)}
                {/* </div> */}
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
                        className="absolute bottom-0 mt-4 mx-auto bg-neutral-50 border border-purple-300 shadow-purple-900/10 rounded-lg p-2 text-left text-neutral-700 origin-top w-full shadow"
                      >
                        <ResizingContainer className="w-full" heightOnly>
                          {m.type === "text" ? (
                            <div className="p-6 text-sm">
                              <div className="max-h-[5lh] overflow-hidden flex flex-col-reverse">
                                {controlEndSequence(m.content)}
                              </div>
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
        <div className="loading-spinner bg-purple-500 w-8 p-1"></div>
      </div>
      <div className="text-purple-700 mb-2">Extracting information</div>
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

const cvText = `Tim
Restieaux
Product Engineer
Curriculum Vitae
I’m someone with a unique journey into web and app development – one grounded in a rich history of user experience
design and digital marketing. I haven’t always been a programmer, in fact my career begins solely in the marketing space;
and when I found how our advertising efforts were limited by stilted digital experiences and a slow pipeline from design to
code I took up the responsibility to drive the digital strategy and got onto the tools.
Oct 2021 � Present
2 years 5 months
Artificial Intelligence Architect
Te P�kenga
Solutions Design
AI Engineering
Te P�kenga is New Zealand's premier vocational education provider undergoing the biggest digital transformation ever
seen in the public sector to unify 24 businesses into a single network.
In my role as AI Architect at Te P�kenga I focused on designing and implementing AI solutions to simplify user navigation
across networks. This included creating modular applications that were scalable and embeddable. I centralised elements
of Te P�kenga’s data into a layer able to be leveraged by AI APIs, a Customer Data Platform, a CMS and a complete
integration design pattern, all for the purpose of accessing and transforming real-time data in intelligent ways for
learners.
Developed micro front-end apps embeddable in any of Te P�kenga's 24 businesses, delivering a cohesive
network experience. Qualitative research showed a 78% boost in the sentiment "I got exactly what I needed"
Architected our web 'Intelligence Layer' – a microservice for extracting and transforming data across products
and users, enhancing with LLMs and passing back to the front-end to power personalisation. In the 6 months
following its launch the website conversion rate increased from 1.5% to 3.5%.
Architected and developed a method for our front-end applications to generate components from a centralised
design system and automate A/B testing. In our sample testing we were able to increase the click-through rate
by 22%.
Designed and developed a custom CMS, an internal digital product that reduced the time to publish content
from 1 week to 4 hours
Oct 2021 � Jun 2022
9 months
Digital Experience Lead
Competenz
UX Management
Full-stack Development
Competenz is a B2B Industry Training Organisation in New Zealand serving 32 industry sectors and with over 11,000
business customers. As Digital Marketing Lead I had 1 direct report.
Ownership of the customer's digital experience from ad channels to the website, from lead nurture through to
conversion, as well as the technology stack of our new platforms. My time at Competenz was focused on building a
micro-services architecture to scale personalised experiences driven by data. We automated nurture funnels that set
unqualified learners up with recruitment coaching and that integrated with our digital systems. We rebuilt content
delivery systems to suit the micro-campaign strategy of the organisation.
Designed the end-to-end customer experience for our automated nuture journey; taking user retention from 31%
to 64%
Developed revisions to our customer tracking pipeline through the phone team, increasing the accuracy of our
data and reducing the time to onboard a new customer by 2 weeks
Feb 2021 � Oct 2021
9 months

Education
Auckland University of Technology
Bachelor of Communications Studies
Major in Creative Industries, Minor in Advertising
2016 � 2018
Skills
React
Javascript
Typescript
HTML & CSS
Node
PostgreSQL
Figma
LLM Finetuning
User research
Full-stack Development
AWS
Identity
Product Strategy
`;
