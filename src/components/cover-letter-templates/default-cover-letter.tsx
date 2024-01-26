import React from "react";
import { digitalMarketerCoverLetter } from "./marketer-template";
import { Globe, Mail, Phone } from "lucide-react";

const DefaultCoverLetter = () => {
  const coverLetterText = digitalMarketerCoverLetter({
    role: "Digital Optimisation Specialist",
  });
  return (
    <div className="w-full max-w-[600px] py-[36px] px-4 flex-col justify-center items-end gap-[47px] inline-flex">
      <div className="self-stretch flex-col justify-start items-start inline-flex">
        <div className="py-[19px] justify-start items-start gap-2.5 inline-flex">
          <div className="text-neutral-700 text-5xl font-extrabold">
            Hello, <br /> <span className="pl-[calc(4rem+1px)]">{`I’m Tim`}</span>
          </div>
        </div>
        <div className="self-stretch py-6 justify-center items-start gap-3.5 inline-flex">
          <div
            className="text-neutral-800 text-[10px] leading-[1.7] font-normal px-[calc(4rem+3px)] focus-visible:outline-none"
            dangerouslySetInnerHTML={{
              __html: coverLetterText.replace(/\n/g, "<br />"),
            }}
            contentEditable
          />
        </div>
      </div>
      <div className="w-[185px] h-[90px] relative shadow-md border rounded-sm hidden">
        <div className="opacity-75 w-[108.04px] h-[45.79px] left-[18px] top-[32px] absolute">
          <a href="tel:+61483848609">
            <div className="w-[90.87px] h-[15.79px] left-0 top-[22.10px] absolute">
              <div className=" left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                <Phone size={8} />
              </div>
              <div className="w-[72.70px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                +61 4 8384 8609
              </div>
            </div>
          </a>
          <div className="w-[81.79px] h-[15.79px] left-0 top-0 absolute">
            <div className="w-[63.61px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
              Melbourne, VIC
            </div>
            <div className=" left-0 top-[2.10px] absolute flex-col justify-start items-start inline-flex">
              <Globe size={8} />
            </div>
          </div>
          <a href="mailto:tim.h.rest@gmail.com" rel="noopener noreferrer">
            <div className="w-[108.04px] h-[15.79px] left-0 top-[44.21px] absolute">
              <div className="w-[88.85px] h-[15.79px] left-[19.18px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                tim.h.rest@gmail.com
              </div>
              <div className="left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                <Mail size={8} />
              </div>
            </div>
          </a>
        </div>
        <div className="w-[113px] h-12 left-[18px] top-[11px] absolute text-neutral-400 text-[8px] font-medium leading-tight">
          Tim Restieaux
        </div>
      </div>
    </div>
  );
};

export default DefaultCoverLetter;
