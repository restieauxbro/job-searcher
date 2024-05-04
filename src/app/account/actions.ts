import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient();

export const handleSignOut = async () => {
  "use server";
  await supabase.auth.signOut();
  redirect("/login");
};
