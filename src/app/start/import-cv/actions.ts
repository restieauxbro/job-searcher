"use server";

import { anthropic } from "@/utils/claude";
import { openai } from "@/utils/openai";
import { createStreamableValue } from "ai/rsc";
import { ProcessingState, StreamState, Message } from "./types";
import { TextMessageWithJson, parseMessageWithJson } from "@/lib/streaming";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function extractTextFromFileWithAssistant(formData: FormData) {
  const file = formData.getAll("files")[0] as File;
  let currentStreamState: StreamState = {
    state: "uploading",
    messages: [],
  };
  const streamAbleVal = createStreamableValue<StreamState>(currentStreamState);
  const updateStream = ({
    state,
    messages,
    documentText,
  }: {
    state?: ProcessingState;
    messages?: Message[];
    documentText?: string;
  }) => {
    const newStreamVal = {
      state: state || currentStreamState.state,
      messages: messages || currentStreamState.messages,
      documentText: documentText || currentStreamState.documentText,
    };
    streamAbleVal.update(newStreamVal);
    currentStreamState = newStreamVal;
  };

  const cookieStore = cookies();
  const anonUserId = cookieStore.get("anonUserId");
  if (!anonUserId) {
    console.error("No anonUserId in cookie store");
    cookieStore.set("anonUserId", crypto.randomUUID());
  }

  updateStream({ state: "uploading" });
  // Create an OpenAI file
  const uploadedFile = await openai.files.create({
    file,
    purpose: "assistants",
  });

  updateStream({ state: "processing with ai" });
  const emptyThread = await openai.beta.threads.create({
    metadata: {
      user: "user-id",
    },
    tool_resources: {
      code_interpreter: {
        file_ids: [uploadedFile.id],
      },
    },
  });

  console.log(emptyThread);

  await openai.beta.threads.messages.create(emptyThread.id, {
    role: "user",
    content: `Please extract text from the file and create a cv-text.txt\n\nThe file type is ${file.type}
    \n\nThe path will likely be /mnt/data/${uploadedFile.id}`,
  });

  openai.beta.threads.runs
    .stream(emptyThread.id, {
      assistant_id: "asst_UISteT2PIlPYD8a39b0fr8kR", // File parser to CV text file assistant
    })
    .on("textCreated", (text) => {
      process.stdout.write("\nassistant > ");
      // start a fresh message in the place of the old one
      updateStream({
        messages: [
          {
            id: crypto.randomUUID(),
            content: "",
            type: "text",
          },
        ],
      });
    })
    .on("textDelta", (textDelta, snapshot) => {
      process.stdout.write(textDelta.value || "");
      textDelta.value &&
        // update the last message with the new content
        updateStream({
          messages: [
            {
              ...currentStreamState.messages[0],
              content:
                (currentStreamState.messages[0]?.content || "") +
                textDelta.value,
            },
          ],
        });
    })
    .on("toolCallCreated", (toolCall) => {
      process.stdout.write(`\nassistant > ${toolCall.type}\n\n`);
      // create new message for code input
      updateStream({
        messages: [
          ...currentStreamState.messages,
          {
            id: crypto.randomUUID(),
            content: "",
            type: "code input",
          },
        ],
      });
    })
    .on("toolCallDelta", (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === "code_interpreter") {
        if (toolCallDelta.code_interpreter?.input) {
          process.stdout.write(toolCallDelta?.code_interpreter.input);
          const arrayWithoutLast = currentStreamState.messages.slice(0, -1);
          const mostRecentMessage = currentStreamState.messages.slice(-1)[0];
          updateStream({
            messages: [
              ...arrayWithoutLast,
              {
                ...mostRecentMessage,
                content:
                  (mostRecentMessage.content || "") +
                  toolCallDelta.code_interpreter.input,
              },
            ],
          });
        }
        if (toolCallDelta.code_interpreter?.outputs) {
          process.stdout.write("\noutput >\n");
          toolCallDelta.code_interpreter?.outputs.forEach((output) => {
            if (output.type === "logs") {
              process.stdout.write(`\n${output.logs}\n`);
            }
          });
        }
      }
    })
    .on("messageDone", async (message) => {
      console.log("\n\nMessage attachments", message.attachments);
      try {
        if (message.attachments) {
          const fileID = message.attachments[0]?.file_id as string;
          try {
            const fileContent = await openai.files.content(fileID);
            const fileText = await fileContent.text();
            updateStream({
              documentText: fileText,
            });
            console.log("\n\nFile text", fileText);
            if (fileContent) {
              // clean up
              try {
                await Promise.all([
                  openai.files.del(fileID),
                  openai.files.del(uploadedFile.id),
                ]);
                streamAbleVal.done();
              } catch (error) {
                console.error("Error deleting files", error);
              }
            }
          } catch (error) {
            console.error("Error fetching file content", error);
          }
        }
      } catch (error) {
        console.error("Error fetching file content", error);
        streamAbleVal.done();
      }
    })
    .on("end", () => {
      console.log("Assistant run completed");
    });
  return streamAbleVal.value;
}

// Anthropic

export async function parseTextToCVWithClaude(string: string) {
  let streamedText = "";
  let messages: TextMessageWithJson[] = [];
  const streamAbleVal = createStreamableValue<{
    status?: "done";
    messages: TextMessageWithJson[];
  }>();

  await anthropic.messages
    .stream({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 1,
      system: `You are a computer for turning the free text extracted from a document into a structured JSON output.\n\nIn Typescript, the types for the output are:\n\n
      export type CVTemplate = {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          location: string; // A city or country
          title: string; // An industry title like "Software Engineer" or "UX Designer"
          intro: string;
          employment: {
            [key: string]: Employment;
          };
          skills?: string[];
        };\n\nexport type Employment = {\ncompany: string;\ncompanyDescription?: string;\nposition: string;\nstartDate: string;\nendDate: string;\ntotalDuration: string;\ndescription: string;\nclassifications: string[]; // One or two words like "UX Design" "Full Stack Engineering"\nachievements?: string[];\n};\n\nexport type Education = {\ninstitution: string;\nqualification: string;\ndetails: string;\nstartDate: string;\nendDate: string;\n};\n\nThe user will dump unformatted text into you and you must intelligently work out the CVTemplate object to output. \n\nFirst start by assessing if the input text relevant for parsing into a CV JSON object, if it\'s not you should output an error message.\n\nYour output should be the following type\n\nexport type CVJSONOutput =\n| {\nisCV: false;\ndocumentType: string;\nerrorMessage: string;\n}\n| {\nisCV: true;\ndocumentType: "cv";\ncv: CVTemplate;\n};\n\nYou must output JSON not JSON5! No double spaces.`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `// USER DOCUMENT TEXT
              \n\n${string}            
              \n\n// END USER DOCUMENT TEXT
              \n\nParse into JSON in the type of CVJSONOutput`,
            },
          ],
        },
      ],
    })
    .on("text", (text) => {
      streamedText += text.replaceAll("\n", "");
      const jsonExtraction = parseMessageWithJson(streamedText);
      console.log(jsonExtraction);
      messages = jsonExtraction;
      streamAbleVal.update({ messages: jsonExtraction });
    })
    .on("end", async () => {
      const anonUserId = cookies().get("anonUserId")?.value;
      const { data, error } = await supabase
        .from("cvg_cv")
        .upsert([
          {
            anon_user_id: anonUserId,
            // @ts-ignore
            cv_data: messages[0].content.cv,
            slug: anonUserId + "-1",
          },
        ])
        .select("cv_data");
      streamAbleVal.done({
        messages,
        status: "done",
      });
    });
  return streamAbleVal.value;
}
