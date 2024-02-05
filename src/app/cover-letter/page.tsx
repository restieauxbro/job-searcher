import DefaultCoverLetter from "@/components/cover-letter-templates/default-cover-letter";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Tim Restieaux Cover Letter',
} 

const CoverLetter = () => {
  return (
    <div>
      <DefaultCoverLetter />
    </div>
  );
};

export default CoverLetter;
