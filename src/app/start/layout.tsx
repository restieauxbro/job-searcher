"use server";
import { Button } from "@/components/ui/button";
import Template from "./template";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { StartNavBar } from "./start-nav-bar";

export interface ILayoutProps {
  children: React.ReactNode;
}
export const maxDuration = 250;

export default async function Layout(props: ILayoutProps) {
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
      <StartNavBar />
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
