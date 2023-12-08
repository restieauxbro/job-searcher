import { CVTemplate } from "@/cv-templates/base-template";
import { Globe, Mail, Phone } from "lucide-react";

const DefaultCV = ({ cvTemplate }: { cvTemplate: CVTemplate }) => {
  const { title, intro, employment } = cvTemplate;
  const employmentArray = Object.entries(employment);
  return (
    <div className="w-full max-w-[600px] py-[43px] bg-white flex-col justify-center items-center inline-flex">
      <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-8 inline-flex">
        <div className="self-stretch justify-start items-end gap-7 inline-flex">
          <div className="text-neutral-700 text-2xl font-extrabold leading-none">
            Tim
            <br />
            Restieaux
          </div>
          <div className="grow shrink basis-0 text-neutral-800 text-[10px] font-medium mb-[4px] leading-[7px]">
            {title}
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-[39px] inline-flex">
          <div className="w-[108.04px] h-[60px] relative">
            <a href="tel:+61483848609">
              <div className="w-[90.87px] h-[15.79px] left-0 top-[22.10px] absolute">
                <div className=" left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                  <Phone size={10} />
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
                <Globe size={10} />
              </div>
            </div>
            <a href="mailto:tim.h.rest@gmail.com" rel="noopener noreferrer">
              <div className="w-[108.04px] h-[15.79px] left-0 top-[44.21px] absolute">
                <div className="w-[88.85px] h-[15.79px] left-[19.18px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                  tim.h.rest@gmail.com
                </div>
                <div className="left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                  <Mail size={10} />
                </div>
              </div>
            </a>
          </div>
          <div className="grow shrink basis-0 text-neutral-700 text-[8px] font-normal  leading-[13px]">
            {intro}
          </div>
        </div>
        <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
          <div className="self-stretch justify-start items-center gap-16 inline-flex">
            <div className="w-[83.44px] text-neutral-700 text-[13px] font-bold  leading-[15px] tracking-tight">
              Employment
            </div>
          </div>
          {employmentArray.map(
            ([
              id,
              {
                startDate,
                endDate,
                totalDuration,
                company,
                position,
                hightlights,
                description,
              },
            ]) => (
              <div
                key={id}
                className="self-stretch justify-start items-start gap-[34px] inline-flex"
              >
                <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                    {startDate} – {endDate}
                  </div>
                  <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                    {totalDuration}
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                    <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                      {position}
                    </div>
                    <div className="justify-start items-center gap-[9px] inline-flex">
                      <div className="text-neutral-700 text-[10px] font-light  leading-3">
                        {company}
                      </div>
                      {hightlights?.map((highlight) => (
                        <div
                          key={highlight}
                          className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex"
                        >
                          <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                            {highlight}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                    {description}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultCV;
