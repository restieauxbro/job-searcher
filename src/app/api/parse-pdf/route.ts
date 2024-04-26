import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import pdfToText from "react-pdftotext";

export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0] as File;
    console.log("File object:", file);

    await pdfToText(file)
      .then((text: any) => console.log(text))
      .catch((error: any) => {
        console.error("Failed to extract text from pdf", error.message);
        throw error;
      });

    return NextResponse.json({
      message: "Successfully extracted text from pdf",
    });
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    return NextResponse.error();
  }
}
