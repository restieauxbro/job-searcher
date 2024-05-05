"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import NeumorphButton, {
  DarkNeumorphButton,
} from "@/components/ui/neumorphic-button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};
const Landing = ({}: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="relative lg:min-h-lvh overflow-hidden">
        <div
          className="absolute bottom-0 left-0 h-[80%]  w-full bg-blue-700"
          style={{ clipPath: "polygon(0 0, 100% 55%, 100% 100%, 0% 100%)" }}
        >
          <BackgroundGradientAnimation />
        </div>
        <div className="px-4 lg:px-8 relative">
          <div className="max-w-screen-md grid gap-4 mx-auto pt-12 xl:pt-24">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center leading-tight tracking-tight text-balance text-gray-800">
              Automate the{" "}
              <span className="italic text-indigo-500">customization</span> of
              your CV <br />
              <span className="text-mango-400">with AI</span>
            </h1>
            <div className="flex justify-center mt-4 gap-4">
              <NeumorphButton childrenProps={{ className: "pl-0" }}>
                <User size={16} /> Login
              </NeumorphButton>
              <Link href="/start">
                <DarkNeumorphButton>Start free</DarkNeumorphButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-screen max-w-screen-2xl px-4 lg:px-20 mx-auto pointer-events-none">
          <div className="aspect-video mt-8 lg:mt-16 bg-neutral-100 rounded-xl shadow-xl overflow-hidden relative border-[3px]">
            <Image
              src="/images/product-screenshot.png"
              alt="Product screenshot"
              width={1500}
              height={900}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Landing;
