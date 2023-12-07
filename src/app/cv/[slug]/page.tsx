import DefaultCV from "@/components/DefaultCV";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div>
      <DefaultCV
        {...{
          title: slug,
          intro: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit vitae, excepturi officia ducimus perferendis`,
        }}
      />
    </div>
  );
}
