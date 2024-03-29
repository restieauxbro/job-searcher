import { ApplicationDetails } from "@/app/cv-builder";
import { CVTemplate } from "@/cv-templates/base-template";
import { slugify } from "@/lib/utils";
import { Database } from "@/types/supabase";

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cv, jobTitle, employer, jobDescription, slug, messages } = body as {
      cv: CVTemplate;
    } & ApplicationDetails & { slug: string; messages: any };
    //  console.log(cv);

    const { data, error } = await supabase
      .from("cvg_cv")
      .upsert(
        [
          {
            cv_data: cv,
            slug,
            job_title: jobTitle,
            employer,
            job_ad_description: jobDescription,
            messages,
          },
        ],
        {
          onConflict: "slug",
        }
      )
      .select("slug, cv_data");
    if (error) {
      console.log(error);
      throw error;
    }
    return Response.json(data);
  } catch (err) {
    return Response.json(err);
  }
}
