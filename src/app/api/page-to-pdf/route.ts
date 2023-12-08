import puppeteer from "puppeteer";

export async function GET(request: Request) {
  // Launch a new browser session.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new", // Opting in to use the new headless mode.
  });

  const page = await browser.newPage();

  // Determine the URL or content to render based on the request parameters.
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url"); // Assuming 'url' is a query parameter.

  // Render the HTML content.
  // You can either navigate to a URL or set HTML content directly.
  if (url) {
    await page.goto(url, { waitUntil: "networkidle0" }); // Navigates to the URL.
  } else {
    const content = `<html><body><h1>Default Content</h1></body></html>`;
    await page.setContent(content);
  }

  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  
  const filename = "CustomFileName.pdf";
  const headers = new Headers();
  headers.append("Content-Type", "application/pdf");
  headers.append("Content-Disposition", `attachment; filename="${filename}"`);

  return new Response(pdf, { headers: headers });
}
