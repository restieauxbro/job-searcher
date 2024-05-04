"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { handleSignOut } from "./actions";
import { DarkNeumorphButton } from "@/components/ui/neumorphic-button";

export interface IAccountProps {}

export default async function Account(props: IAccountProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div>
        <h1 className="text-4xl mb-4">Account</h1>
        <pre>
          {JSON.stringify(
            {
              user,
            },
            null,
            2
          )}
        </pre>
        <form action={handleSignOut}>
          <DarkNeumorphButton>Sign Out</DarkNeumorphButton>
        </form>
      </div>
    </div>
  );
}
