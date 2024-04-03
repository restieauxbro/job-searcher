import React from "react";
import CvWithIntro from "@/components/cv-components/cv-with-intro-component";
import { productEngineerTemplate } from "@/cv-templates/product-engineer";

const ProductEngineer = () => {
  return (
    <>
      <CvWithIntro cvTemplate={productEngineerTemplate} />
    </>
  );
};

export default ProductEngineer;
