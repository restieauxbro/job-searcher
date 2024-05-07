import DefaultCV from "@/components/cv-components/DefaultCV";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";
import { Database } from "@/types/supabase";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: cvFromDb, error } = await supabase
    .from("cvg_cv")
    .select("cv_data")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return <div>Error loading CV</div>;
  }

  return (
    <>
      <DefaultCV
        // @ts-ignore
        cvTemplate={cvFromDb?.cv_data || baseTemplate}
      />
    </>
  );
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: cvFromDb, error } = await supabase
    .from("cvg_cv")
    .select("employer, job_title")
    .eq("slug", slug)
    .single();

  return {
    title: "CV",
    //title: "Tim Restieaux for " + cvFromDb?.employer || cvFromDb?.job_title,
  };
}
