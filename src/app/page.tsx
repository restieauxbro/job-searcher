"use client";

import DefaultCV from "@/components/DefaultCV";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Employment, baseTemplate } from "@/cv-templates/base-template";
import { parseMessageWithJson } from "@/lib/streaming";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { useState } from "react";
import Balancer from "react-wrap-balancer";

export default function Home() {
  const [cv, setCv] = useState(baseTemplate);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "system",
        content: systemInstructions,
        id: "cv-customisation-ai-1",
      },
      {
        role: "assistant",
        content: exampleSuggestions,
        id: "cv-customisation-ai-2",
      },
    ],
  });

  const handleEditCv = (json: { [key: string]: any }) => {
    const intro: string | undefined = json.intro;
    const employment: Employment | undefined = json.employment;
    if (intro) {
      setCv((prev) => ({ ...prev, ...{ intro } }));
    }
    if (employment) {
      const newEmployment = { ...cv.employment };
      // for each key in employment, update the employment object
      Object.keys(employment).forEach((key) => {
        newEmployment[key] = {
          ...newEmployment[key],
          // @ts-ignore
          ...employment[key],
        };
      });
      setCv((prev) => ({ ...prev, ...{ employment: newEmployment } }));
    }
  };

  return (
    <main className="">
      <div className="grid min-h-screen xl:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 max-w-[1700px] mx-auto">
        <div className="w-full max-w-xl xl:justify-self-end">
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
          <form onSubmit={handleSubmit}>
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
        <div className="xl:max-h-screen sticky top-0 pt-16 xl:h-screen grid">
          <div className="grid place-items-center">
            <div className="shadow-md shadow-neutral-300 px-14 py-10 rounded-md border">
              <DefaultCV cvTemplate={cv} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const systemInstructions = `Tim's CV:

export type CVTemplate = {
  title?: string;
  intro?: string;
  employment?: {
    [key: string]: Employment;
  }
};

export type Employment = {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  totalDuration?: string;
  description?: string;
  hightlights?: string[];
};

export const baseTemplate: CVTemplate = ${JSON.stringify(
  baseTemplate,
  null,
  2
)};

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
             description: "new edited description goes here, focusing expertly and creatively on the things it needs to"
             }
       }
}`;

const exampleSuggestions = `Based on the key themes from the job advert, the focus areas for Tim's CV should include: \n\n1. AI research and development 2. Implementation and optimization of large language models 3. Cross-functional collaboration 4. Designing and conducting experiments for models and algorithms 5. Mentoring junior AI engineers and data scientists 6. Presentation of findings and progress to stakeholders 7. Adherence to ethical AI practices and compliance standards Tim's CV JSON edits would be as follows: \`\`\` json { "intro": "As a seasoned Product Engineer and proficient AI researcher, I excel in driving transformations through intelligent automated solutions in the infrastructure, application, and data layer. I am adept in large language models, machine learning and data science techniques, and thrive in a collaborative environment where I can contribute towards the development and optimization of these systems. With experience in conducting strategic AI experiments, mentoring junior engineers, and presenting complex findings to stakeholders, I champion innovative solutions that align with ethical standards and regulations.", "employment": { "tp-ai-architect": { "description": "In my role as the AI Arc`;
