import DefaultCV from "@/components/DefaultCV";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";

const Page = () => {
  return (
    <>
        <DefaultCV cvTemplate={baseTemplate} />
    </>
  );
};

export default Page;
