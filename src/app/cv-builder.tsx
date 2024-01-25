"use client";

import DefaultCV from "@/components/DefaultCV";
import HistorySidebar from "@/components/HistorySidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CVTemplate,
  Employment,
  baseTemplate,
} from "@/cv-templates/base-template";
import { parseMessageWithJson } from "@/lib/streaming";
import { cn, slugify } from "@/lib/utils";
import { useChat } from "ai/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Balancer from "react-wrap-balancer";

export default function CVBuilderApp({
  history,
  chosenCV,
}: {
  history:
    | {
        employer: string | null;
        id: number;
        job_title: string | null;
        slug: string | null;
        created_at: string;
      }[]
    | null;
  chosenCV?:
    | {
        employer: string | null;
        id: number;
        job_title: string | null;
        slug: string | null;
        created_at: string;
      }[]
    | null;
}) {
  return (
    <div className="flex relative">
      <HistorySidebar {...{ history }} />
      <CVBuilder />
    </div>
  );
}

function CVBuilder() {
  const [uneditedCv, setUneditedCv] = useState<CVTemplate>(baseTemplate);
  // only changes when the base template is replaced

  const [cv, setCv] = useState(uneditedCv);

  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetails>({});

  const slug = createApplicationSlug(applicationDetails);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "system",
        content: systemInstructions(cv),
        id: "cv-customisation-ai-1",
      },
      // {
      //   role: "assistant",
      //   content: exampleSuggestions,
      //   id: "cv-customisation-ai-2",
      // },
    ],
  });

  const invokeCognition = async (e: any) => {
    e.preventDefault();
    handleSubmit(e);
    if (!slug) {
      // get application details to save to the database
      const details = await getApplicationDetails(input);
      if (details) {
        setApplicationDetails({ ...details, jobDescription: input });
      }
    }
  };

  const handleEditCv = async (json: {
    title?: string;
    intro?: string;
    employment?: Employment;
    skills?: string[];
  }) => {
    // Create a new copy of the CV state for manipulation
    let newCv = { ...cv };

    // Update newCv with provided values
    if (json.intro) {
      newCv.intro = json.intro;
    }
    if (json.title) {
      newCv.title = json.title;
    }
    if (json.skills) {
      newCv.skills = json.skills;
    }
    if (json.employment) {
      newCv.employment = { ...newCv.employment };
      Object.keys(json.employment).forEach((key) => {
        newCv.employment[key] = {
          ...newCv.employment[key],
          // @ts-ignore
          ...json.employment[key],
        };
      });
    }

    console.log("new cv", { newCv });
    // Update the state once with the newCv
    setCv(newCv);

    // Since setState is asynchronous, use the updated state in a callback or useEffect
    // Here, we're assuming uploadCv can be called independently
    // without needing the updated state immediately
    await uploadCv(newCv);
  };

  const uploadCv = async (cvData: CVTemplate) => {
    try {
      // upload to database by sending in body to /api/upload-cv
      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: JSON.stringify({
          cv: cvData,
          ...applicationDetails,
          slug,
          messages,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const printCV = () => {
    // Open the CV page in a new window
    if (!window) return;
    const cvWindow = window.open(`/cv/${slug || ""}`, "_blank");
    if (!cvWindow) return;

    // Wait for the new window to load
    cvWindow.onload = function () {
      // Trigger the print dialog
      cvWindow.print();

      // Optional: Close the CV window after printing
      cvWindow.onafterprint = function () {
        cvWindow.close();
      };
    };
  };

  return (
    <div className="grid min-h-screen xl:grid-cols-2 px-4 xl:px-12 gap-4 lg:gap-8 xl:gap-12 max-w-[1700px] mx-auto">
      <div className="w-full max-w-xl grid xl:items-center xl:justify-self-end py-8">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold max-w-lg leading-[0.8] text-neutral-800 mb-4 tracking-tight">
            <Balancer>Customise this CV</Balancer>
          </h1>
          <ul>
            {messages
              .filter((m, i) => m.role !== "system") // Not the system prompt and not the first user message
              .map(({ content, id, role }, i) => {
                const mArray = parseMessageWithJson(content);
                const jsonSuggestions = mArray.filter(
                  ({ type }) => type === "json"
                )[0]?.content;
                return (
                  <li
                    key={id}
                    className={cn(
                      "my-8 p-6 rounded-md shadow-md bg-slate-100 border border-slate-200"
                    )}
                  >
                    {role === "user" ? "User: " : "AI: "}
                    {mArray.map(({ content, type }, i) => {
                      const contentArray = Object.entries(content);
                      return (
                        <div key={i}>
                          {type === "text" ? (
                            <p
                              className="mb-4"
                              dangerouslySetInnerHTML={{
                                __html: content
                                  .replace("```json", "")
                                  .replace("```", "")
                                  .replace(/\n/g, "<br />"),
                              }}
                            />
                          ) : (
                            // Render JSON
                            <div className="mb-4">
                              {typeof content === "string" ? (
                                <p className="p-4 shadow-lg">{content}</p>
                              ) : (
                                contentArray.map(([key, value], i) => {
                                  return (
                                    <div
                                      key={i}
                                      className="mt-4 p-4 text-sm shadow-lg w-[110%] bg-white rounded-md border"
                                    >
                                      <p className="font-bold">{key}</p>
                                      {typeof value === "string" ? (
                                        <p>{value}</p>
                                      ) : (
                                        <div>
                                          {Object.entries(value).map(
                                            ([key2, value2], i) => {
                                              return (
                                                <div key={i}>
                                                  <p className="font-medium mt-2">
                                                    {key2}
                                                  </p>
                                                  <p>
                                                    {JSON.stringify(value2)}
                                                  </p>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                      <div className="mt-4 flex justify-end">
                                        <Button
                                          size={"sm"}
                                          variant="secondary"
                                          className="text-xs"
                                          onClick={() => {
                                            handleEditCv({ [key]: value });
                                          }}
                                        >
                                          Accept
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {jsonSuggestions && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          size={"sm"}
                          onClick={() => {
                            typeof jsonSuggestions !== "string" &&
                              handleEditCv(jsonSuggestions);
                          }}
                        >
                          Accept all
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
          <form onSubmit={invokeCognition}>
            <Textarea
              placeholder="Paste a job advert in here and have AI edit your CV"
              autoFocus
              className="shadow-md mt-8"
              value={input}
              onChange={handleInputChange}
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit">Get edits</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="xl:max-h-screen sticky top-0 pt-16 xl:h-screen grid">
        <div className="grid place-items-center">
          <div className="shadow-md shadow-neutral-300 px-14 py-10 rounded-md border max-h-[1000px] overflow-y-auto">
            <DefaultCV cvTemplate={cv} />
          </div>
          <div className="m-8 flex justify-end w-full gap-4 px-4 p-4">
            <Link
              href={`/cv/${slug || ""}`}
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              <div className="flex gap-1 items-center">
                View <ArrowUpRight size={16} />
              </div>
            </Link>
            <Button size="sm" onClick={printCV}>
              <div className="flex gap-1 items-center">
                Download <ArrowDown size={16} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const systemInstructions = (cvTemplate: CVTemplate) => `Tim's CV:

export type CVTemplate = {
  title: string;
  intro: string;
  employment: {
    [key: string]: Employment;
  };
  skills?: string[];
};

export type Employment = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  totalDuration: string;
  description: string;
  hightlights: string[];
};

export const baseTemplate: CVTemplate = ${JSON.stringify(cvTemplate, null, 2)};

END CV

Tim's CV Customizer is designed to assist Tim in crafting and enhancing his curriculum vitae (CV). Its primary goal is to provide creative and effective edits for improving the content based on the job advert it's responding to.

When the user (who will be Tim) sends a job advert, you respond first by analysing the job advert and drawing out its key themes. Name the things Tim's CV should focus on in applying for it. Then output JSON of the parts of the CV to be edited. For example if the intro is to be edited, respond with a JSON object with just the intro edits

eg.

{
intro: "edited text here"
}

And if the intro and a certain job experience description should change, target it and edit by outputting JSON such as 

{
intro: "edited text here",
employment: {
      tp-ai-architect: {
             description: "new edited description goes here, focusing expertly and creatively on the things it needs to."
             }
       }
}

Use Australian spelling, such as "organisation" instead of organization.`;

const exampleSuggestions = `Based on the key themes from the job advert, the focus areas for Tim's CV should include: \n\n1. AI research and development 2. Implementation and optimisation of large language models 3. Cross-functional collaboration 4. Designing and conducting experiments for models and algorithms 5. Mentoring junior AI engineers and data scientists 6. Presentation of findings and progress to stakeholders 7. Adherence to ethical AI practices and compliance standards Tim's CV JSON edits would be as follows: \`\`\` json { "intro": "As a seasoned Product Engineer and proficient AI researcher, I excel in driving transformations through intelligent automated solutions in the infrastructure, application, and data layer. I am adept in large language models, machine learning and data science techniques, and thrive in a collaborative environment where I can contribute towards the development and optimisation of these systems. With experience in conducting strategic AI experiments, mentoring junior engineers, and presenting complex findings to stakeholders, I champion innovative solutions that align with ethical standards and regulations.", "employment": { "tp-ai-architect": { "description": "In my role as the AI Arc`;

export type ApplicationDetails = {
  jobTitle?: string;
  employer?: string;
  jobDescription?: string;
};

const getApplicationDetails = async (
  jobDescription: string
): Promise<ApplicationDetails | undefined> => {
  // post to /api/chat with jobDescription in messages array
  try {
    const messages = [
      {
        role: "system",
        content: `Your job is to output the job title and employer from the a job advertisment that the user will give you. Please output JSON in the following format:

        { "jobTitle": "Example Job Title", "employer": "Example Employer" }`,
      },
      { role: "user", content: jobDescription },
    ];
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        model: "gpt-4-1106-preview",
        response_format: { type: "json_object" },
      }),
    });
    const data = (await res.json()) as ApplicationDetails;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createApplicationSlug = (applicationDetails: ApplicationDetails) => {
  return applicationDetails.jobTitle && applicationDetails.employer
    ? slugify(applicationDetails.jobTitle + "-" + applicationDetails.employer)
    : applicationDetails.jobTitle;
};
