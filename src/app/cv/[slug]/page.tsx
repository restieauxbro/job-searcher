import DefaultCV from "@/components/DefaultCV";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";

type CvgCv = {
  id: number; // bigint maps to number in TypeScript
  created_at: Date; // timestamp with time zone maps to Date
  slug: string | null; // text can be string, nullable since it's 'null' in SQL
  cv_data: any | null; // jsonb can be any, nullable
  employer: string | null; // text as string, nullable
  job_ad_description: string | null; // text as string, nullable
  job_title: string | null; // text as string, nullable
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
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

  const { data: cvFromDb, error } = (await supabase
    .from("cvg_cv")
    .select("*")
    .eq("slug", slug)
    .single()) as { data: CvgCv | null; error: any };

  if (error) {
    console.error(error);
    return <div>Error loading CV</div>;
  }
  return (
    <>
      <DefaultCV cvTemplate={cvFromDb?.cv_data || baseTemplate} />
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

  const { data: cvFromDb, error } = (await supabase
    .from("cvg_cv")
    .select("*")
    .eq("slug", slug)
    .single()) as { data: CvgCv | null; error: any };

  return {
    title: "Tim Restieaux for " + cvFromDb?.employer || cvFromDb?.job_title,
  };
}
