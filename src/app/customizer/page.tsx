import { CVEntryFromSupabase, Database } from "@/types/supabase";
import React from "react";
import CVBuilderApp from "../cv-builder";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const { j } = searchParams;

  const supabase = createClient();
  const historyDataPromise = supabase
    .from("cvg_cv")
    .select("employer, id, job_title, slug, created_at")
    .neq("job_title", null)
    .order("created_at", { ascending: false })
    .limit(25);

  let promises: any = [historyDataPromise];

  if (j) {
    const chosenCVPromise = supabase
      .from("cvg_cv")
      .select("cv_data, messages, employer, id, job_title, slug, created_at")
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
      <CVBuilderApp
        history={historyData.data}
        {...{
          chosenCV: chosenCV?.data as CVEntryFromSupabase,
        }}
      />
    </>
  );
}
