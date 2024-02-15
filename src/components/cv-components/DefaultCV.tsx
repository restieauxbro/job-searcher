import { CVTemplate } from "@/cv-templates/base-template";
import { ArrowUpRight, Globe, Mail, Phone } from "lucide-react";

const DefaultCV = ({ cvTemplate }: { cvTemplate: CVTemplate }) => {
  const { title, intro, employment, education, skills } = cvTemplate;
  // Define the desired order
  const order = [
    "tp-ai-architect",
    "cz-digital-experience-lead",
    "cz-digital-marketing-lead",
    "cz-digital-marketing-executive",
    "uxbridge-arts-culture",
  ];

  // Convert the object into an array
  const employmentArray = Object.entries(employment);

  // Sort the array based on the predefined order
  const sortedEmploymentArray = employmentArray.sort((a, b) => {
    const indexA = order.indexOf(a[0]);
    const indexB = order.indexOf(b[0]);
    return indexA - indexB;
  });
  return (
    <div className="w-full max-w-[600px] py-[43px] bg-white flex-col justify-center items-center inline-flex gap-8">
      <div className="flex-col justify-start items-start gap-8 inline-flex min-h-[1025px] h-auto">
        <div className="self-stretch justify-start items-end gap-7 inline-flex">
          <h1 className="text-neutral-700 text-2xl font-extrabold leading-none">
            Tim
            <br />
            Restieaux
          </h1>
          <div
            className="grow shrink basis-0 text-neutral-800 text-[10px] font-medium mb-[4px] leading-[7px] inline focus-visible:outline-none text-pretty"
            contentEditable
          >
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
          <div
            className="grow shrink basis-0 text-neutral-700 text-[8px] font-normal leading-[13px] inline focus-visible:outline-none"
            contentEditable
          >
            {intro}
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-8 flex">
          <div className="self-stretch justify-start items-center gap-16 inline-flex">
            <div className="text-neutral-700 text-[13px] font-bold  leading-[15px] tracking-tight flex items-center gap-2">
              {/* <Briefcase size={13} />  */}
              Employment
            </div>
          </div>
          {sortedEmploymentArray.map(
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
                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                    {startDate} – {endDate}
                  </div>
                  <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                    {totalDuration}
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                    <div className="w-[165px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                      {position}
                    </div>
                    <div className="justify-start items-center gap-[9px] inline-flex flex-wrap">
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
                  <div
                    className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px] inline focus-visible:outline-none"
                    contentEditable
                  >
                    {description}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {(education || skills) && (
        <div className="flex gap-8 w-full">
          {education && (
            <div className="min-w-fit max-w-sm">
              <div className="w-[83.44px] text-neutral-700 text-[13px] font-bold  leading-[15px] tracking-tight mb-4 flex gap-2 items-center">
                {/* <GraduationCap size={13} />  */}
                Education
              </div>
              {education?.map(
                ({
                  startDate,
                  endDate,
                  institution,
                  details,
                  qualification,
                }) => (
                  <div
                    key={institution}
                    className="flex-col justify-start items-start gap-0.5 inline-flex"
                  >
                    <div className="text-neutral-700 text-[10px] font-medium leading-3 mb-1 flex gap-2 items-center">
                      {institution}
                    </div>
                    <div className="italic text-neutral-800 text-[10px] font-light leading-3">
                      {qualification}
                    </div>
                    <div className="italic text-neutral-700 text-[10px] font-light leading-3">
                      {details}
                    </div>
                    <div className=" text-neutral-600 text-[10px] font-light leading-[18px] mt-1">
                      {startDate} – {endDate}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          {skills && (
            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[83.44px] text-neutral-700 text-[13px] font-bold leading-[15px] tracking-tight mb-4 flex gap-2 items-center">
                {/* <Award size={13} /> */}
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-blue-100 rounded-[13px] justify-center items-center gap-[13px] flex"
                  >
                    <div className="text-blue-800 text-[8px] font-normal  leading-[4.50px]">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-full mt-4">
        <div className="text-neutral-700 text-[13px] font-bold tracking-tight flex gap-2 items-center">
          {/* <Rocket size={13} /> */}
          Selected projects
        </div>

        <div className="grow grid gap-4 mt-6">
          {[
            {
              title: "Agency landing page",
              employer: "Oscar Tango",
              link: "https://oscartango.digital",
              contributions: ["Design", "Build"],
            },
            {
              title: "CV builder web app",
              employer: "Competenz",
              link: "https://competenz-cv-builder.netlify.app/",
              contributions: ["Strategy", "Interraction Design", "Build"],
            },
            {
              title: "Employer onboarding helper",
              employer: "Te Pūkenga",
              link: "https://www.xn--tepkenga-szb.ac.nz/on-job-learning",
              contributions: ["User Research", "Design", "Build"],
            },
          ].map(({ title, employer, link, contributions }) => (
            <div key={title} className="mt-0">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="text-neutral-700 text-[10px] leading-3 mb-1 flex gap-2 items-center justify-between">
                  <div className="flex gap-4">
                    <div className="font-medium">{title}</div>
                    <div className="text-neutral-400">{employer}</div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="text-neutral-500">
                      {contributions.map((contribution, i) => (
                        <span key={contribution} className="text-[8px]">
                          {contribution}
                          {i !== contributions.length - 1 && (
                            <span className="mx-2 text-neutral-300">/</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="text-neutral-500">
                      <ArrowUpRight strokeWidth={1.2} />
                    </div>
                  </div>
                </div>
                <hr className="border-t border-neutral-300 w-full" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultCV;
