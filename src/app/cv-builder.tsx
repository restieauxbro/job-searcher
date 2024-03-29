"use client";

import DefaultCV from "@/components/cv-components/DefaultCV";
import HistorySidebar from "@/components/HistorySidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CVTemplate,
  Employment,
  baseTemplate,
} from "@/cv-templates/base-template";
import { parseMessageWithJson } from "@/lib/streaming";
import { cn, slugify } from "@/lib/utils";
import { CVEntryFromSupabase } from "@/types/supabase";
import { useChat } from "ai/react";
import { ArrowDown, ArrowUpRight, Edit, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CvWithIntro from "@/components/cv-components/cv-with-intro-component";
import { aIEngineeringTemplate } from "@/cv-templates/ai-engineer";
import { Input } from "@/components/ui/input";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ResizingContainer from "@/components/animations/resizing-container";

type CVTheme = "basic" | "projects-cover-page";
type TemplateContentSlug = "software-engineer" | "marketing-technologist";

export type ApplicationDetails = {
  jobTitle?: string;
  employer?: string;
  jobDescription?: string;
};

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
  chosenCV?: CVEntryFromSupabase;
}) {
  return (
    <div className="flex relative bg-[linear-gradient(to_right,_white_70%,_#f5f7fa_80%)]">
      <HistorySidebar {...{ history }} />
      <CVBuilder {...{ chosenCV: chosenCV }} />
    </div>
  );
}

function CVBuilder({ chosenCV }: { chosenCV?: CVEntryFromSupabase }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cvTheme = searchParams.get("cv-theme") as CVTheme;
  const templateContent = searchParams.get(
    "template-content"
  ) as TemplateContentSlug;

  const baseTemplateFromSlug = (slug: TemplateContentSlug): CVTemplate => {
    const map = {
      "software-engineer": aIEngineeringTemplate,
      "marketing-technologist": baseTemplate,
    };
    return map[slug] || baseTemplate;
  };

  const [uneditedCv, setUneditedCv] = useState<CVTemplate>(
    chosenCV?.cv_data || baseTemplateFromSlug(templateContent)
  );

  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetails>({});

  const [cv, setCv] = useState<CVTemplate>(
    baseTemplateFromSlug(templateContent)
  );

  useEffect(() => {
    console.log("chosenCV", chosenCV);
    if (chosenCV && chosenCV.cv_data) {
      setCv(chosenCV.cv_data);
      setUneditedCv(chosenCV.cv_data);
    }
  }, [chosenCV]);

  const slug = createApplicationSlug(applicationDetails) || chosenCV?.slug;
  const cvThemePathname =
    cvTheme === "projects-cover-page" ? "/cv-with-intro" : "/cv";

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "system",
        content: systemInstructions(uneditedCv),
        id: "cv-customisation-ai-1",
      },
      ...(chosenCV?.messages ?? []),
    ],
  });

  const invokeCognition = async (e: any) => {
    e.preventDefault();
    handleSubmit(e);
    if (!createApplicationSlug(applicationDetails)) {
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
    const cvWindow = window.open(`${cvThemePathname}/${slug || ""}`, "_blank");
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
    <div className="grid min-h-lvh xl:grid-cols-2 px-4 xl:px-12 gap-4 lg:gap-8 xl:gap-20 max-w-[1700px] mx-auto">
      <div className="w-full max-w-xl grid xl:items-center xl:justify-self-end py-8">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            <div className="relative z-10 mt-20">
              <motion.h1
                className="text-5xl font-extrabold max-w-lg leading-none text-neutral-700 mb-4 tracking-tight text-balance"
                layout
                key={
                  chosenCV?.employer
                    ? chosenCV.job_title + " for " + chosenCV.employer
                    : "Edit this CV"
                }
              >
                {chosenCV?.employer
                  ? chosenCV.job_title + " for " + chosenCV.employer
                  : "Edit this CV"}
              </motion.h1>
              <ul className="mt-8">
                {messages
                  .filter((m, i) => m.role !== "system") // Not the system prompt and not the first user message
                  .map(({ content, id, role }, i) => {
                    const mArray = parseMessageWithJson(content);
                    const jsonSuggestions = mArray.filter(
                      ({ type }) => type === "json"
                    )[0]?.content;
                    return (
                      <motion.li
                        key={id}
                        exit={{ opacity: 0, y: 20 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={cn(
                          "py-6 relative border-t border-slate-200 min-h-[75px]"
                        )}
                      >
                        <ResizingContainer className="w-full" heightOnly>
                          <div
                            className={cn(
                              "absolute top-5 -left-16 size-8 bg-gray-600 border border-gray-600 rounded grid place-items-center text-white/80",
                              role === "user" && "bg-white text-gray-700"
                            )}
                          >
                            {role === "user" ? (
                              <User strokeWidth={1.5} size={20} />
                            ) : (
                              <Sparkles strokeWidth={1.5} size={20} />
                            )}
                          </div>
                          {mArray.map(({ content, type }, i) => {
                            const contentArray = Object.entries(content);
                            return (
                              <div key={i}>
                                {type === "text" ? (
                                  <TextRender
                                    text={content}
                                    truncate={role === "user" && i === 0}
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
                                            className="mb-4 p-4 pl-0 text-sm shadow-lg shadow-blue-900/20 w-full bg-white rounded-md rounded-l-none border border-blue-800/30 relative flex gap-4"
                                          >
                                            <div
                                              className={cn(
                                                "absolute -top-1 -left-16 size-8 bg-blue-600 rounded grid place-items-center text-white"
                                              )}
                                            >
                                              <Edit
                                                strokeWidth={1.5}
                                                size={20}
                                              />
                                            </div>
                                            <div className="h-full absolute left-0 top-0 border-r-2 border-blue-500"></div>
                                            <div className="pl-6 grow">
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
                                                            {JSON.stringify(
                                                              value2
                                                            )}
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
                                                    handleEditCv({
                                                      [key]: value,
                                                    });
                                                  }}
                                                >
                                                  Accept
                                                </Button>
                                              </div>
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
                                className="bg-blue-600"
                                onClick={() => {
                                  typeof jsonSuggestions !== "string" &&
                                    handleEditCv(jsonSuggestions);
                                }}
                              >
                                Accept all
                              </Button>
                            </div>
                          )}
                        </ResizingContainer>
                      </motion.li>
                    );
                  })}
              </ul>
              <form onSubmit={invokeCognition}>
                <Input
                  placeholder={messages.length > 1 ? "Give feedback or ask for more" :"Paste a job advert in here and have AI edit your CV"}
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
          </AnimatePresence>
        </LayoutGroup>
      </div>
      <div className="xl:max-h-screen sticky top-0 pt-16 xl:h-screen grid">
        <div className="grid place-items-center">
          <div className="w-full flex gap-4 justify-end mb-4">
            <Select
              onValueChange={(templateContentSlug: TemplateContentSlug) => {
                const editableSearchParams = new URLSearchParams(searchParams);
                editableSearchParams.set(
                  "template-content",
                  templateContentSlug
                );
                router.push(pathname + "?" + editableSearchParams.toString());
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Base template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="marketing-technologist">
                  Marketing technologist
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(cvTheme: CVTheme) => {
                const editableSearchParams = new URLSearchParams(searchParams);
                editableSearchParams.set("cv-theme", cvTheme);
                router.push(pathname + "?" + editableSearchParams.toString());
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="projects-cover-page">
                  With projects cover page
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="shadow-md shadow-neutral-300 bg-white py-10 w-screen max-w-screen-md rounded-md border border-neutral-300 max-h-[calc(100lvh-14rem)] overflow-y-auto">
            {cvTheme === "projects-cover-page" ? (
              <CvWithIntro cvTemplate={cv} />
            ) : (
              <div className="px-14 grid">
                <DefaultCV cvTemplate={cv} />
              </div>
            )}
          </div>
          <div className="m-8 flex justify-end w-full gap-4 px-4 p-4">
            <Link
              href={`${cvThemePathname}/${slug || chosenCV?.slug || ""}`}
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

const TextRender = ({
  text,
  truncate,
}: {
  text: string;
  truncate?: boolean;
}) => {
  const cleanedText = text
    .replace("```Javascript", "")
    .replace("```javascript", "")
    .replace("```json", "")
    .replace("```", "")
    .replace(/\n/g, "<br />");
  if (truncate) {
    return (
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{
          __html: cleanedText.trim().substring(0, 200) + "...",
        }}
      />
    );
  } else {
    return (
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{
          __html: cleanedText,
        }}
      />
    );
  }
};

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
  companyDescription?: string;
  position: string;
  startDate: string;
  endDate: string;
  totalDuration: string;
  description: string;
  hightlights: string[];
  achievements?: string[];
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

Use Australian spelling, such as "organisation" instead of organization. Do not fabricate any information, but if there is experience that you can imply Tim has that hasn't been explicitly mentioned. For example, if the job ad calls for html and CSS experience, and Tim has experience with web development, you can imply that he has html and CSS experience.

The existing job descriptions in Tim;s CV are well-worded but may just need a slight change in emphasis or different skills mentioned. Try to use the existing content as much as possible, but with enhancements based on the job advert.`;

const exampleSuggestions = `Based on the key themes from the job advert, the focus areas for Tim's CV should include: \n\n1. AI research and development 2. Implementation and optimisation of large language models 3. Cross-functional collaboration 4. Designing and conducting experiments for models and algorithms 5. Mentoring junior AI engineers and data scientists 6. Presentation of findings and progress to stakeholders 7. Adherence to ethical AI practices and compliance standards Tim's CV JSON edits would be as follows: \`\`\` json { "intro": "As a seasoned Product Engineer and proficient AI researcher, I excel in driving transformations through intelligent automated solutions in the infrastructure, application, and data layer. I am adept in large language models, machine learning and data science techniques, and thrive in a collaborative environment where I can contribute towards the development and optimisation of these systems. With experience in conducting strategic AI experiments, mentoring junior engineers, and presenting complex findings to stakeholders, I champion innovative solutions that align with ethical standards and regulations.", "employment": { "tp-ai-architect": { "description": "In my role as the AI Arc`;

const getApplicationDetails = async (
  jobDescription: string
): Promise<ApplicationDetails | undefined> => {
  // post to /api/chat with jobDescription in messages array
  try {
    const messages = [
      {
        role: "system",
        content: `Your job is to output the job title and employer from the a job advertisment that the user will give you. Please output JSON in the following format:

        { "jobTitle": "Example Job Title", "employer": "Example Employer" }
        
        If the user's input is not a job advert, you should output the same object with null values for jobTitle and employer.`,
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
