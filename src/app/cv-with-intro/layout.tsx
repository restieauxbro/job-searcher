import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tim Restieaux CV",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen grid place-items-center">
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
