"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import NeumorphButton, {
  DarkNeumorphButton,
} from "@/components/ui/neumorphic-button";
import Header from "@/components/web-ui/header";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};
const Landing = ({}: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="px-4 lg:px-8">
        <div className="max-w-screen-sm grid gap-4 mx-auto pt-12 xl:pt-24">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center leading-tight tracking-tight text-balance text-gray-800">
            Ask your CV to update itself
          </h1>
          <div className="flex justify-center mt-4 gap-4">
            <NeumorphButton>Say hi!</NeumorphButton>
            <DarkNeumorphButton
              onClick={() => router.push("/start", { scroll: false })}
            >
              Get started
            </DarkNeumorphButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
