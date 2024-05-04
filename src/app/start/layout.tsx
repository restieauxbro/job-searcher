"use server";
import { Button } from "@/components/ui/button";
import Template from "./template";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { parseTextToCVWithClaude } from "./import-cv/actions";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default async function Layout(props: ILayoutProps) {
  const ip = getIp();
  const supabase = createClient(true);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   const { data: anonIpUser, error } = await supabase
  //     .from("users")
  //     .upsert({ initial_ip_address: ip }, { onConflict: "initial_ip_address" })
  //     .select("*");
  //   console.log({ anonIpUser });
  //   if (error) {
  //     console.error(error);
  //   }
  // }

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
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </div>
      <Template>{props.children}</Template>
    </div>
  );
}

function getIp() {
  let forwardedFor = headers().get("x-forwarded-for");
  let realIp = headers().get("x-real-ip");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIp) return realIp.trim();
  return null;
}
