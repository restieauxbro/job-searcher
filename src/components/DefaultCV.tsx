import { Globe, Mail, Phone } from "lucide-react";
import React from "react";

const DefaultCV = ({ title, intro }: { title?: string; intro?: string }) => {
  return (
    <div className="w-full max-w-[700px] px-10 py-[43px] bg-white flex-col justify-center items-center inline-flex">
      <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-8 inline-flex">
        <div className="self-stretch justify-start items-end gap-7 inline-flex">
          <div className="text-neutral-700 text-2xl font-extrabold leading-none">
            Tim <br /> Restieaux
          </div>
          <div className="grow shrink basis-0 text-neutral-800 text-[10px] font-medium mb-[4px] leading-[7px]">
            {title || "Digital Marketer and Product Engineer"}
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-[39px] inline-flex">
          <div className="w-[108.04px] h-[60px] relative">
            <div className="w-[90.87px] h-[15.79px] left-0 top-[22.10px] absolute">
              <div className=" left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                <Phone size={10} />
              </div>
              <div className="w-[72.70px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                <a href="tel:+61483848609">+61 4 8384 8609</a>
              </div>
            </div>
            <div className="w-[81.79px] h-[15.79px] left-0 top-0 absolute">
              <div className="w-[63.61px] h-[15.79px] left-[18.17px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                Melbourne, VIC
              </div>
              <div className=" left-0 top-[2.10px] absolute flex-col justify-start items-start inline-flex">
                <Globe size={10} />
              </div>
            </div>
            <div className="w-[108.04px] h-[15.79px] left-0 top-[44.21px] absolute">
              <div className="w-[88.85px] h-[15.79px] left-[19.18px] top-0 absolute text-neutral-800 text-[8px] font-normal  leading-[15px]">
                <a href="mailto:tim.h.rest@gmail.com" rel="noopener noreferrer">
                  tim.h.rest@gmail.com
                </a>
              </div>
              <div className="left-0 top-[2.11px] absolute flex-col justify-start items-start inline-flex">
                <Mail size={10} />
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 text-neutral-700 text-[8px] font-normal  leading-[13px]">
            {intro ||
              `A Marketer who codes. I am a dynamic professional who leverages
            technology to transform user experiences and maximise the impact of
            marketing strategy. With a track record of architecting intelligent
            solutions and automating processes, I have excelled in driving user
            engagement and conversion in the education and training sector. My
            work in channel management, CX design, AI research, and full-stack
            development, combined with a keen focus on optimising ad spend,
            makes me a trailblazer in delivering results that matter to users.`}
          </div>
        </div>
        <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
          <div className="self-stretch justify-start items-center gap-16 inline-flex">
            <div className="w-[83.44px] text-neutral-700 text-[13px] font-bold  leading-[15px] tracking-tight">
              Employment
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-[34px] inline-flex">
            <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                Oct 2021 – Present
              </div>
              <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                2 years
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                  Artificial Intelligence Architect
                </div>
                <div className="justify-start items-center gap-[9px] inline-flex">
                  <div className="text-neutral-700 text-[10px] font-light  leading-3">
                    Te Pūkenga
                  </div>
                  <div className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex">
                    <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                      Full Stack Development
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                Architecting, designing and developing intelligent ways for
                users to navigate the Te Pūkenga network. This involved
                everything from CX design to AI research and leading in-house
                front end development. Creating modular applications that were
                scalable and embeddable. I centralised elements of Te Pūkenga’s
                data into a layer able to be leveraged by AI APIs, a CDP, a CMS
                and a complete integration design pattern, all for the purpose
                of accessing and transforming real-time data in intelligent ways
                for ākonga and kaimahi. I led the workstream “Intelligent
                Navigation” which was guided by the principle of providing agile
                solutions that minimised tech debt during transition, easing the
                complexity of the network for our users.
              </div>
            </div>
          </div>
          <div className=" justify-start items-start gap-[34px] inline-flex">
            <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                Sep 2021 – Jun 2022
              </div>
              <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                10 months
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                  Digital Experience Lead
                </div>
                <div className="justify-start items-center gap-[9px] inline-flex">
                  <div className="text-neutral-700 text-[10px] font-light  leading-3">
                    Competenz
                  </div>
                  <div className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex">
                    <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                      UX Management
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                Ownership of the customer's digital experience from ad channels
                to the website, from lead nurture through to conversion. My time
                at Competenz was focused on building a micro-services
                architecture to scale personalised experiences driven by data.
                We automated nurture funnels that set unqualified learners up
                with recruitment coaching that integrated with our digital
                systems. We rebuilt content delivery systems to suit the
                micro-campaign strategy of the organisation.{" "}
              </div>
            </div>
          </div>
          <div className=" justify-start items-start gap-[34px] inline-flex">
            <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                Feb 2021 – Oct 2021
              </div>
              <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                9 months
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                  Digital Marketing Lead
                </div>
                <div className="justify-start items-center gap-[9px] inline-flex">
                  <div className="text-neutral-700 text-[10px] font-light  leading-3">
                    Competenz
                  </div>
                  <div className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex">
                    <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                      Digital channels
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                All things digital marketing for New Zealand's largest Industry
                Training Organisation – using data to maximise ad spend across
                32 discreet industry sectors. We used behavioural metadata to
                create distinct IDs and follow cross-channel engagement – the
                kind of thing a CDP does out-of-the-box I set up through
                semi-automated integrations with the technology we had
                available.
              </div>
            </div>
          </div>
          <div className=" justify-start items-start gap-[34px] inline-flex">
            <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                Oct 2019 – Feb 2021
              </div>
              <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                1 year 5 months
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                  Digital Marketing Executive
                </div>
                <div className="justify-start items-center gap-[9px] inline-flex">
                  <div className="text-neutral-700 text-[10px] font-light  leading-3">
                    Competenz
                  </div>
                  <div className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex">
                    <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                      Marketing
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                Liaising with agencies, the design team and stakeholders to
                execute digital campaigns in alignment to the business marketing
                strategy. Tracking campaign success on key metrics.
              </div>
            </div>
          </div>
          <div className=" justify-start items-start gap-[34px] inline-flex">
            <div className="w-[113px] flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="w-[114px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                May 2015 – Aug 2019
              </div>
              <div className="w-[114px] text-neutral-500 text-[10px] font-light  leading-3">
                4 years 4 months
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="pb-2.5 flex-col justify-start items-start gap-0.5 flex">
                <div className="w-[165px] h-[18px] text-neutral-800 text-[10px] font-medium  leading-[18px]">
                  Operations Assistant
                </div>
                <div className="justify-start items-center gap-[9px] inline-flex">
                  <div className="text-neutral-700 text-[10px] font-light  leading-3">
                    UXBRIDGE | Arts & Culture
                  </div>
                  <div className="px-2 pt-1 pb-[3px] bg-emerald-100 rounded-[13px] justify-center items-center gap-[13px] flex">
                    <div className="text-green-900 text-[6px] font-normal  leading-[4.50px]">
                      Operations
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-neutral-700 text-[8px] font-normal  leading-[13px]">
                Multi-faceted role spanning the creative organisation; assisting
                the studios, gallery and events departments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultCV;
