import { createClient } from "@supabase/supabase-js";

const competenzRecruitmentSupabase = createClient(
  "https://iellkycuquaxhgxtucng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODY1MjgyMywiZXhwIjoxOTQ0MjI4ODIzfQ.-L0c9aVFhayCzMenBJvYp08HAr74pUIxI1FbC2boNxU"
);
const careerAcceleratorSupabase = createClient(
  "https://hqgzjteyegcjbcsulykr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ3pqdGV5ZWdjamJjc3VseWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMjIwOTAsImV4cCI6MjAyODc5ODA5MH0.X8AP7D4ReKWzZB8HExhFlnJmYBxzHUWb67PUfxrD3lQ"
);

export async function GET() {
  try {
    const [public_content, public_content2] = await Promise.all([
      competenzRecruitmentSupabase.from("public_content").select("*").limit(1),
      careerAcceleratorSupabase.from("public_content").select("*").limit(1),
    ]);

    const error = public_content.error;
    const error2 = public_content2.error;
    const data = public_content.data;
    const data2 = public_content2.data;

    if (error || error2) {
      console.log(error);
      throw error;
    }
    return Response.json({ data, data2 });
  } catch (err) {
    return Response.json(err);
  }
}
