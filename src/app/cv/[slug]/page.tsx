import DefaultCV from "@/components/DefaultCV";
import { baseTemplate } from "@/cv-templates/base-template";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <>
      <DefaultCV cvTemplate={baseTemplate} />
    </>
  );
}
