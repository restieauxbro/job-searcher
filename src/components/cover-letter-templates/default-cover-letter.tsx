import React from "react";
import { digitalMarketerCoverLetter } from "./marketer-template";
import { Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";

const DefaultCoverLetter = () => {
  const coverLetterText = digitalMarketerCoverLetter({
    role: "Digital Optimisation Specialist",
  });
  return (
    <div className="w-screen max-w-[800px] min-h-[1120px] pt-[48px] px-4 grid place-items-center relative">
      <Image
        src={"/images/mask-group.png"}
        alt="mask-group"
        width={1000}
        height={1000}
        className="w-full absolute top-0 left-0 h-1/3 scale-y-[-1] opacity-0"
      />
      <div className="self-stretch flex-col justify-start items-start inline-flex relative w-[600px]">
        <div className="py-[19px] justify-start items-start gap-2.5 inline-flex">
          <div className="text-neutral-600 text-5xl font-extrabold tracking-tight">
            Hello, <br />{" "}
            <span className="pl-[calc(4rem+1px)]">{`I’m Tim`}</span>
          </div>
        </div>
        <div className="self-stretch py-6 justify-center items-start gap-3.5 inline-flex">
          <div
            className="text-neutral-800 text-[10px] leading-[1.7] px-[calc(4rem+3px)] focus-visible:outline-none font-light"
            dangerouslySetInnerHTML={{
              __html: coverLetterText.replace(/\n/g, "<br />"),
            }}
            contentEditable
          />
        </div>
      </div>
      <div
        className="shadow-md neumorphic-outline absolute bottom-12 right-12 text-slate-700 text-[8px] rounded-md overflow-hidden opacity-85"
        // style={{
        //   background:
        //     "radial-gradient(circle at top, rgb(255 255 255 / 90%), rgb(255 255 255 / 30%))",
        // }}
      >
        <div className="bg-gradient-to-b from-white to-slate-500/20 p-[2px]">
          <div className="bg-gradient-to-br from-slate-100 to-70% to-white rounded-[3.5px] p-6 grid gap-2 pr-12">
            <div className="flex gap-3 items-center">
              <div className=" text-slate-500">
                <Globe size={10} />
              </div>
              <div className="">Melbourne, VIC</div>
            </div>
            <a href="tel:+61483848609">
              <div className="flex gap-3 items-center">
                <div className=" text-slate-500">
                  <Phone size={10} />
                </div>
                <div className="">+61 4 8384 8609</div>
              </div>
            </a>
            <a
              href="mailto:tim.h.rest@gmail.com"
              rel="noopener noreferrer"
              className="flex gap-3 items-center"
            >
              <div className=" text-slate-500">
                <Mail size={10} />
              </div>
              <div className="">tim.h.rest@gmail.com</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultCoverLetter;
