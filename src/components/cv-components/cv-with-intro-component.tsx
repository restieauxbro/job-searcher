import { CVTemplate } from "@/cv-templates/base-template";
import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import React from "react";
import Divider from "../ui/divider";
import Image from "next/image";

const CvWithIntro = ({ cvTemplate }: { cvTemplate: CVTemplate }) => {
  const { title, intro, employment, education, skills } = cvTemplate;
  // Define the desired order
  const order = [
    "lead-dev",
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
    <div className="w-full max-w-[800px] py-[43px] bg-white flex-col justify-center items-center inline-flex gap-8 text-neutral-700">
      <div className="min-h-[1080px] overflow-hidden w-full max-w-[800px] grid place-items-center pb-[100px] relative">
        {/* <Image
          src={"/images/rolling-waves.png"}
          alt="rolling-waves"
          width={1000}
          height={1000}
          className="w-full absolute bottom-0 left-0 h-[31%] object-cover object-top opacity-0"
        /> */}
        <Image
          src={"/images/mask-group.png"}
          alt="mask-group"
          width={1000}
          height={1000}
          className="w-full absolute bottom-0 left-0 h-1/3 scale-x-[-1]"
        />
        <div className="w-full relative max-w-lg">
          <div className="pt-14 gap-4 items-end w-full grid grid-cols-[auto,1fr,auto]">
            <div>
              {/* <div className="size-14 overflow-hidden rounded-full mb-4 opacity-90">
                <Image
                  src={"/images/profile-image.jpeg"}
                  alt="me"
                  width={200}
                  height={200}
                  className=""
                />
              </div> */}
              <h1 className="text-neutral-600 text-[36px] font-extrabold leading-none">
                Tim
                <br />
                Restieaux
              </h1>
            </div>
            <Divider className="mb-[4px]" />
            <div className="leading-none mb-[4px] text-[11px] min-w-[76px]">
              {cvTemplate.title || "Web Engineer"}
            </div>
          </div>
          <div className="text-neutral-600 font-light mt-6 text-[11px]">
            Curriculum Vitae
          </div>
          <div
            className="mt-8 text-[9px] font-light leading-[1.7] focus-visible:outline-none"
            contentEditable
            dangerouslySetInnerHTML={{
              __html:
                cvTemplate.intro
                  .toString()
                  .replace("\n\n", "<br><br>")
                  .replace("\\n", "<br>") ||
                `I’m a full-stack web development engineer with a background in optimising user experiences. With a career that’s moved from digital marketing through to full-stack, I am experienced in managing digital assets as a whole product instead of as isolated components. In my last three roles in cross-functional teams I’ve taken ownership of digital strategy as well as been lead developer on its execution. This makes me the perfect addition to a team that needs to move fast and creatively.`,
            }}
          />

          {/* <div className="flex mt-4 gap-2">
            <Button
              size="sm"
              className="opacity-80 text-[9px] px-4 h-auto py-2 bg-gradient-to-br from-purple-500 to-blue-700"
            >
              Take a journey
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="opacity-80 text-[9px] px-4 h-auto py-2"
            >
              Contact
            </Button>
          </div> */}
        </div>
        <div className="w-full mt-4 relative max-w-lg pb-32">
          <div className="text-neutral-500 text-[10px] font-extralight tracking-tight flex gap-2 items-center">
            {/* <Rocket size={13} /> */}
            Selected projects
          </div>

          <div className="grow grid gap-3 mt-6">
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
                contributions: ["Strategy", "Interaction Design", "Build"],
              },
              {
                title: "Employer onboarding helper",
                employer: "Te Pūkenga",
                link: "https://restio-projects.vercel.app/tp-onboarding-helper",
                contributions: ["User Research", "Design", "Build"],
              },
              // {
              //   title: "Universal search",
              //   employer: "Te Pūkenga",
              //   link: "https://www.xn--tepkenga-szb.ac.nz/?search=",
              //   contributions: ["Architecture", "Algorithm Development"],
              // },
            ].map(({ title, employer, link, contributions }) => (
              <div key={title} className="mt-0">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <div className="text-neutral-700 text-[10px] leading-3 mb-1 flex gap-2 items-center justify-between">
                    <div className="flex gap-4">
                      <div className="font-normal">{title}</div>
                      <div className="text-neutral-500">{employer}</div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="text-neutral-600">
                        {contributions.map((contribution, i) => (
                          <span
                            key={contribution}
                            className="text-[8px] font-extralight"
                          >
                            {contribution}
                            {i !== contributions.length - 1 && (
                              <span className="mx-2 text-neutral-300">/</span>
                            )}
                          </span>
                        ))}
                      </div>

                      <div className="text-neutral-500">
                        <ArrowUpRight strokeWidth={0.8} />
                      </div>
                    </div>
                  </div>
                  <Divider />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-12 left-0 w-full text-[8px]">
          <div className="max-w-[33rem] mx-auto grid gap-3 text-neutral-600">
            <a
              href="https://github.com/restieauxbro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center"
            >
              <div className="size-5 bg-neutral-400/10 rounded-full grid place-items-center">
                <Github size={10} className="text-neutral-500" />
              </div>
              @restieauxbro
            </a>
            <a
              href="https://www.linkedin.com/in/timrestieaux/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center"
            >
              <div className="size-5 bg-neutral-400/10 rounded-full grid place-items-center">
                <Linkedin size={10} className="text-neutral-500" />
              </div>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 right-12">
          <div
            className="absolute size-[200px] bg-pink-400/25 rounded-full border-4 border-white blur-lg pointer-events-none"
            style={{ bottom: -50, right: -10 }}
          ></div>

          <div
            className="shadow-md neumorphic-outline justify-self-end text-slate-700 text-[8px] rounded-md relative overflow-hidden opacity-85"
            // style={{
            //   background:
            //     "radial-gradient(circle at top, rgb(255 255 255 / 90%), rgb(255 255 255 / 30%))",
            // }}
          >
            <div className="bg-gradient-to-b from-white to-slate-500/20 p-[2px]">
              <div className="bg-gradient-to-br from-slate-100 to-70% to-white rounded-[3.5px] p-6 grid gap-2 pr-20">
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
                {/* <a
                  href="https://www.linkedin.com/in/timrestieaux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className=" text-slate-500">
                    <Linkedin size={10} />
                  </div>
                  <div className="">@timrestieaux</div>
                </a> */}
              </div>
            </div>
          </div>
          <div
            className="absolute size-[30px] rounded-full bg-white/80 blur pointer-events-none"
            style={{
              top: -20,
              right: 20,
            }}
          ></div>
          <div
            className="absolute w-[10px] h-[200px] -rotate-45 rounded-full bg-white/90 blur pointer-events-none"
            style={{
              top: -100,
              right: 20,
            }}
          ></div>
          <div
            className="absolute size-[150px] rounded-full border-[8px] border-white/80 blur-[7px] pointer-events-none"
            style={{
              top: -75,
              right: -45,
            }}
          ></div>
          <div
            className="absolute size-[100px] rounded-full border-[2px] border-white/80 blur-[2px] pointer-events-none"
            style={{
              top: -50,
              right: -20,
            }}
          ></div>
        </div>
        <div className="place-holder"></div>
      </div>

      <div className="flex-col justify-start items-start gap-8 inline-flex h-auto max-w-[600px] pt-12">
        <div className="self-stretch flex-col justify-start items-start gap-8 flex">
          <div className="self-stretch justify-start items-center gap-16 inline-flex">
            <div className="text-neutral-700 text-[13px] font-bold tracking-tight flex items-center gap-2">
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
                companyDescription,
                position,
                highlights,
                description,
                achievements,
              },
            ]) => (
              <div
                key={id}
                className="self-stretch justify-start items-start gap-[34px] inline-flex"
              >
                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="w-[114px] text-neutral-800 text-[10px] font-normal">
                    {startDate} – {endDate}
                  </div>
                  <div className="w-[114px] text-neutral-500 text-[10px] font-extralight">
                    {totalDuration}
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                    <div className="w-[165px] text-neutral-800 text-[10px] font-normal mb-1">
                      {position}
                    </div>
                    <div className="justify-start items-center gap-[9px] inline-flex flex-wrap">
                      <div className="text-neutral-700 text-[10px] font-extralight">
                        {company}
                      </div>
                      {highlights?.map((highlight) => (
                        <div
                          key={highlight}
                          className="px-2 py-[4px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex"
                        >
                          <div className="text-green-900 text-[6px] leading-none font-normal">
                            {highlight}
                          </div>
                        </div>
                      ))}
                    </div>
                    {companyDescription && (
                      <div
                        className="text-neutral-900 text-[8px] mt-2 leading-[1.7] font-light text-pretty focus-visible:outline-none"
                        contentEditable
                      >
                        {companyDescription}
                      </div>
                    )}
                  </div>
                  <div
                    className="self-stretch text-neutral-900 text-[8px] font-light leading-[1.7] inline focus-visible:outline-none"
                    contentEditable
                  >
                    {description}
                  </div>
                  {achievements && (
                    <div className="grid gap-2 mt-4">
                      {achievements &&
                        achievements.map((achievement) => (
                          <div
                            key={achievement}
                            className="grid grid-cols-[20px,1fr] gap-3"
                          >
                            <Divider className="mt-[7px] mb-0" />
                            <div
                              className="text-neutral-900 text-[8px] font-light leading-[1.7] inline focus-visible:outline-none text-pretty"
                              contentEditable
                            >
                              {achievement}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        {(education || skills) && (
          <div className="flex gap-8 w-full mt-8">
            {education && (
              <div className="min-w-fit max-w-sm">
                <div className="w-[83.44px] text-neutral-700 text-[13px] font-bold leading-[15px] tracking-tight mb-4 flex gap-2 items-center">
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
                      <div className="text-neutral-700 text-[10px] font-normal leading-3 mb-1 flex gap-2 items-center">
                        {institution}
                      </div>
                      <div className="italic text-neutral-800 text-[10px] font-extralight leading-3">
                        {qualification}
                      </div>
                      <div className="italic text-neutral-700 text-[10px] font-extralight leading-3">
                        {details}
                      </div>
                      <div className=" text-neutral-600 text-[10px] font-extralight leading-[18px] mt-1">
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
      </div>
    </div>
  );
};

export default CvWithIntro;
