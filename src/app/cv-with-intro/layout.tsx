import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tim Restieaux CV",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid place-items-center">{children}</div>
  );
};

export default Layout;
