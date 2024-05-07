import { CVTemplate } from "@/cv-templates/base-template";
import { ArrowUpRight, Globe, Mail, Phone } from "lucide-react";
import Divider from "../ui/divider";

const DefaultCV = ({ cvTemplate }: { cvTemplate: CVTemplate }) => {
  const {
    title,
    intro,
    employment,
    education,
    skills,
    firstName,
    lastName,
    email,
    phone,
    location,
  } = cvTemplate;
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
  const employmentArray = employment ? Object.entries(employment) : [];

  // Sort the array based on the predefined order
  const sortedEmploymentArray = employmentArray.sort((a, b) => {
    const indexA = order.indexOf(a[0]);
    const indexB = order.indexOf(b[0]);
    return indexA - indexB;
  });
  return (
    <div className="w-[600px] py-[43px] bg-white flex-col justify-center items-center inline-flex gap-8">
      <div className="flex-col justify-start items-start gap-8 inline-flex min-h-[1125px] h-auto">
        <div className="self-stretch justify-start items-end gap-7 inline-flex">
          <h1 className="text-neutral-700 text-2xl font-extrabold leading-none">
            {firstName}
            <br />
            {lastName}
          </h1>
          <div
            className="grow shrink basis-0 text-neutral-800 text-[10px] font-medium mb-[4px] leading-[7px] inline focus-visible:outline-none text-pretty"
            contentEditable
          >
            {title}
          </div>
        </div>
        <div className="w-[108.04px] grid gap-2">
          {[
            {
              value: location,
              icon: <Globe size={10} />,
            },
            {
              value: email,
              icon: <Mail size={10} />,
              link: `mailto:${email}`,
            },
            {
              title: "phone",
              value: phone,
              icon: <Phone size={10} />,
              link: `tel:${phone}`,
            },
          ].map(({ value, icon, link }) => {
            if (link)
              return (
                <a
                  href={link}
                  key={value}
                  className="grid grid-cols-[auto,1fr] leading-tight gap-2 items-center font-normal text-[8px]"
                >
                  {icon}
                  {value}
                </a>
              );
            else
              return (
                <div className="grid grid-cols-[auto,1fr] leading-tight gap-2 items-center font-normal text-[8px]">
                  {icon}
                  {value}
                </div>
              );
          })}
        </div>
        {/* <div className="self-stretch justify-start items-start gap-[39px] inline-flex">
          <div className="w-[108.04px] h-[60px] relative">
            <a href={`tel:${phone}`}>
              <div className="w-[90.87px] h-[15.79px] left-0 top-[22.10px] absolute">
                <div className=" left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                  <Phone size={10} />
                </div>
                <div className="w-[72.70px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                  {phone}
                </div>
              </div>
            </a>
            <div className="w-[81.79px] h-[15.79px] left-0 top-0 absolute">
              <div className="w-[63.61px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                {location}
              </div>
              <div className=" left-0 top-[2.10px] absolute flex-col justify-start items-start inline-flex">
                <Globe size={10} />
              </div>
            </div>
            <a href={`mailto:${email}`} rel="noopener noreferrer">
              <div className="w-[108.04px] h-[15.79px] left-0 top-[44.21px] absolute">
                <div className="w-[88.85px] h-[15.79px] left-[19.18px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                  {email}
                </div>
                <div className="left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                  <Mail size={10} />
                </div>
              </div>
            </a>
          </div>
          <div
            className="grow shrink basis-0 text-neutral-700 text-[8px] font-light leading-[13px] inline focus-visible:outline-none"
            contentEditable
          >
            {intro}
          </div>
        </div> */}
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
                companyDescription,
                position,
                highlights,
                classifications,
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
                  <div className="flex-col justify-start items-start gap-0.5 flex">
                    <div className="w-[165px] text-neutral-800 text-[10px] font-normal mb-1">
                      {position}
                    </div>
                    <div className="justify-start items-center gap-[9px] inline-flex flex-wrap">
                      <div className="text-neutral-700 text-[10px] font-extralight">
                        {company}
                      </div>
                      {(highlights || classifications)?.map((highlight) => (
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
                        className="text-neutral-700 text-[8px] mt-2 leading-[1.7] text-pretty focus-visible:outline-none font-light"
                        contentEditable
                      >
                        {companyDescription}
                      </div>
                    )}
                  </div>
                  {description && (
                    <div
                      className="self-stretch text-neutral-900 mt-2.5 text-[8px] font-light leading-[1.7] inline focus-visible:outline-none"
                      contentEditable
                    >
                      {description}
                    </div>
                  )}
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
      </div>
      {(education || skills) && (
        <div className="grid gap-8 w-full grid-cols-2">
          {education && (
            <div className="">
              <div className="text-neutral-700 text-[13px] font-bold  leading-[15px] tracking-tight mb-4 flex gap-2 items-center">
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
                    className="grid items-start gap-0.5"
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
              <div className=" text-neutral-700 text-[13px] font-bold leading-[15px] tracking-tight mb-4 flex gap-2 items-center">
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
  );
};

export default DefaultCV;
