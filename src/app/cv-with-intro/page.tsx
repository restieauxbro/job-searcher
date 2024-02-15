import CvWithIntro from "@/components/cv-components/cv-with-intro-component";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";

const Page = () => {
  return <CvWithIntro cvTemplate={baseTemplate} />;
};

export default Page;
