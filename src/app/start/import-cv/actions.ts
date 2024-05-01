"use server";

import { openai } from "@/utils/openai";
import { createStreamableValue } from "ai/rsc";

export type ProcessingState =
  | "idle"
  | "uploading"
  | "processing with ai"
  | "error"
  | "done";

type Message = {
  id: string;
  type: "text" | "code input" | "code output";
  content: string;
};

export type StreamState = {
  state: ProcessingState;
  messages: Message[];
};

export async function extractTextFromFileWithAssistant(formData: FormData) {
  const file = formData.getAll("files")[0] as File;
  let currentStreamState: StreamState = {
    state: "uploading",
    messages: [],
  };
  let respond
  const streamAbleVal = createStreamableValue<StreamState>(currentStreamState);
  const updateStream = ({
    state,
    messages,
  }: {
    state?: ProcessingState;
    messages?: Message[];
  }) => {
    const newStreamVal = {
      state: state || currentStreamState.state,
      messages: messages || currentStreamState.messages,
    };
    streamAbleVal.update(newStreamVal);
    currentStreamState = newStreamVal;
  };

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

  const run = openai.beta.threads.runs
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
          const fileContent = await openai.files.content(fileID);
          const fileText = await fileContent.text();
          console.log("\n\nFile text", fileText);
          if (fileContent) {
            // clean up
            // try {
            //   await Promise.all([
            //     openai.files.del(fileID),
            //     openai.files.del(uploadedFile.id),
            //   ]);
            // } catch (error) {
            //   console.error("Error deleting files", error);
            // }
          }
        }
      } catch (error) {}
    })
    .on("end", () => {
      console.log("Assistant run completed");
      streamAbleVal.done();
    });
  return streamAbleVal.value;
}
