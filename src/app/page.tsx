"use client";

import DefaultCV from "@/components/DefaultCV";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { baseTemplate } from "@/cv-templates/base-template";
import { completeAndExtractJson, validParsedJson } from "@/lib/streaming";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import Balancer from "react-wrap-balancer";

export default function Home() {
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
  return (
    <main className="">
      <div className="grid min-h-screen place-items-center xl:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 p-4 md:p-8">
        <div className="w-full max-w-xl xl:justify-self-end">
          <h1 className="text-5xl lg:text-6xl font-extrabold max-w-lg leading-[0.8] text-neutral-800 mb-4 tracking-tight">
            <Balancer>Customise this CV</Balancer>
          </h1>
          <ul>
            {messages
              .filter((m, i) => m.role !== "system") // Not the system prompt and not the first user message
              .map((m, i) => {
                const renderedContent = m.content;
                let json = null;
                // if this is the last message
                if (i === messages.length - 2) {
                  const extractedJsonString =
                    completeAndExtractJson(renderedContent);
                  const parsedJSON = validParsedJson(extractedJsonString);

                  if (!!parsedJSON) {
                    json = parsedJSON;
                  }
                }
                return (
                  <li
                    key={m.id}
                    className={cn(
                      "mb-8 p-8 rounded-md shadow-md"
                    )}
                  >
                    {m.role === "user" ? "User: " : "AI: "}
                    {renderedContent}
                    {json && (
                      <div className="mt-4">
                        <div className="bg-neutral-100 p-4 rounded-md text-sm shadow">
                          {json.intro}
                        </div>
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
              className="shadow-md mt-8 min-h-[124px]"
              value={input}
              onChange={handleInputChange}
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit">Get edits</Button>
            </div>
          </form>
        </div>
        <div className="xl:justify-self-start">
          <div className="shadow-md shadow-neutral-300 px-14 py-10 rounded-md border">
            {/* <DefaultCV cvTemplate={baseTemplate} /> */}
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

const exampleSuggestions = `Based on the key themes from the job advert, the focus areas for Tim's CV should include: 1. AI research and development 2. Implementation and optimization of large language models 3. Cross-functional collaboration 4. Designing and conducting experiments for models and algorithms 5. Mentoring junior AI engineers and data scientists 6. Presentation of findings and progress to stakeholders 7. Adherence to ethical AI practices and compliance standards Tim's CV JSON edits would be as follows: \`\`\` json { "intro": "As a seasoned Product Engineer and proficient AI researcher, I excel in driving transformations through intelligent automated solutions in the infrastructure, application, and data layer. I am adept in large language models, machine learning and data science techniques, and thrive in a collaborative environment where I can contribute towards the development and optimization of these systems. With experience in conducting strategic AI experiments, mentoring junior engineers, and presenting complex findings to stakeholders, I champion innovative solutions that align with ethical standards and regulations.", "employment": { "tp-ai-architect": { "description": "In my role as the AI Arc`;
