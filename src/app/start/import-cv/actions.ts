"use server";

import { openai } from "@/utils/openai";

export async function extractTextFromFileWithAssistant(
  fileID: string,
  fileType: string
) {
  const myThread = await openai.beta.threads.retrieve(
    "thread_nTSa6Uvbrb5CMudIvpkDfp4Z"
  );

  console.log({ myThread });

  const emptyThread = await openai.beta.threads.create({
    metadata: {
      user: "user-id",
    },
    tool_resources: {
      code_interpreter: {
        file_ids: [fileID],
      },
    },
  });

  console.log(emptyThread);

  const threadMessages = await openai.beta.threads.messages.create(
    emptyThread.id,
    {
      role: "user",
      content: `Please extract text from the file and create a cv-text.txt\n\nThe file type is ${fileType}`,
    }
  );

  console.log(threadMessages);

  const run = openai.beta.threads.runs
    .stream(emptyThread.id, {
      assistant_id: "asst_UISteT2PIlPYD8a39b0fr8kR", // File parser to CV text file assistant
      // tools: ["code_interpreter"],
    })
    .on("textCreated", (text) => process.stdout.write("\nassistant > "))
    .on("textDelta", (textDelta, snapshot) =>
      process.stdout.write(textDelta.value || "")
    )
    .on("toolCallCreated", (toolCall) =>
      process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)
    )
    .on("toolCallDelta", (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === "code_interpreter") {
        if (toolCallDelta.code_interpreter?.input) {
          process.stdout.write(toolCallDelta?.code_interpreter.input);
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
    .on("messageDone", (message) => {
      console.log("\n\nMessage attachments", message.attachments);
    })
    .on("end", () => {
      console.log("Assistant run completed");
    });
}
