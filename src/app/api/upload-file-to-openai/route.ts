import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const config = { runtime: "edge" };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0] as any;
    console.log("File object:", file);

    // Create an OpenAI file
    const openaiFile = await openai.files.create({
      file,
      purpose: "assistants",
    });

    // get the type of the file by checking the file name
    const fileName = file.name;
    const fileType = fileName.split(".").pop();

    return NextResponse.json({ openaiFile, fileType });
  } catch (e) {
    if (e instanceof Error) console.error("Failed to upload file", e.message);
    return NextResponse.error();
  }
}
