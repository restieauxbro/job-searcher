import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0] as any;
    console.log("File object:", file);

   

    return NextResponse.json('hello');
  } catch (e) {
    if (e instanceof Error) console.error("Failed to upload file", e.message);
    return NextResponse.error();
  }
}
