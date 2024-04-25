import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import * as React from "react";
import Template from "./template";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default async function Layout(props: ILayoutProps) {
  const supabase = createClient();
  // const { data, error } = await supabase.auth.signInAnonymously();
  // if (error) console.error("error", error);
  const { data: session } = await supabase.auth.getSession();
  const { data: user } = await supabase.auth.getUser();

  return (
    <div>
      <div className="fixed top-0 left-0 w-full grid place-items-center border-b p-1">
        <div className="flex gap-8 flex-wrap">
          {["Style", "Import your CV", "Edit"].map((item, index) => (
            <Button
              key={item}
              variant={"ghost"}
              size={"sm"}
              className="text-neutral-500 text-xs"
            >
              {item}
            </Button>
          ))}
        </div>
        {/* <pre>
          {JSON.stringify(
            {
              session,
              user,
            },
            null,
            2
          )}
        </pre> */}
      </div>
      
      <Template>{props.children}</Template>
    </div>
  );
}
