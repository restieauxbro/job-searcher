import { CVEntryFromSupabase, Database } from "@/types/supabase";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import CVBuilderApp from "@/app/cv-builder";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const { j } = searchParams;
  const anonUserId = cookies().get("anonUserId")?.value;
  if (!anonUserId) {
    redirect("/start");
  }

  const supabase = createClient();
  const historyDataPromise = supabase
    .from("cvg_cv")
    .select("employer, id, job_title, slug, created_at")
    .eq("anon_user_id", anonUserId)
    // .neq("job_title", null)
    .order("created_at", { ascending: false })
    .limit(25);

  let promises: any = [historyDataPromise];

  let chosenCVPromise = supabase
    .from("cvg_cv")
    .select("cv_data, messages, employer, id, job_title, slug, created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (j) {
    chosenCVPromise = chosenCVPromise.eq("id", j);
  } else {
    console.log({anonUserId})
    chosenCVPromise = chosenCVPromise.eq("anon_user_id", anonUserId);
  }

  promises.push(chosenCVPromise);

  const [historyData, chosenCV] = await Promise.all(promises);

  if (historyData.error || (j && chosenCV.error)) {
    console.error(historyData.error || chosenCV.error);
    return <div>Error loading CV</div>;
  }

  return (
    <>
      {/* {anonUserId}
      chosen CV: {JSON.stringify(chosenCV)} <br />
      hostory: {JSON.stringify(historyData)} */}
      <CVBuilderApp
        {...{
          anonUserId,
          history: historyData.data,
          chosenCV: chosenCV?.data[0] as CVEntryFromSupabase,
        }}
      />
    </>
  );
}
