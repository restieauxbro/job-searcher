import DefaultCV from "@/components/cv-components/DefaultCV";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const supabase = createClient();

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
  const supabase = createClient()

  const { data: cvFromDb, error } = await supabase
    .from("cvg_cv")
    .select("employer, job_title, cv_data")
    .eq("slug", slug)
    .single();

  return {
    //title: "CV",
    title: `${cvFromDb?.cv_data.firstName} ${cvFromDb?.cv_data.lastName} CV`,
  };
}
