import Sidebar from "@/components/HistorySidebar";
import { CVEntryFromSupabase, Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import React from "react";
import CVBuilderApp from "./cv-builder";
import { CVTemplate } from "@/cv-templates/base-template";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const { j } = searchParams;
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
  const historyDataPromise = supabase
    .from("cvg_cv")
    .select("employer, id, job_title, slug, created_at")
    .order("created_at", { ascending: false })
    .limit(25);

  let promises: any = [historyDataPromise];

  if (j) {
    const chosenCVPromise = supabase
      .from("cvg_cv")
      .select("cv_data, employer, id, job_title, slug, created_at")
      .eq("id", j)
      .single();

    promises.push(chosenCVPromise);
  }

  const [historyData, chosenCV] = await Promise.all(promises);

  if (historyData.error || (j && chosenCV.error)) {
    console.error(historyData.error || chosenCV.error);
    return <div>Error loading CV</div>;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(chosenCV?.data, null, 2)}</pre> */}
      <CVBuilderApp
        history={historyData.data}
        {...{
          chosenCV: chosenCV?.data as CVEntryFromSupabase,
        }}
      />
    </>
  );
}
