import * as React from "react";

export default function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  return (
    <div className="fixed bottom-0 right-0 z-10 m-8 size-12 grid place-items-center shadow-md border rounded border-neutral-400">
      <div className="text-neutral-900 text-sm">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">sm</div>
        <div className="hidden md:block lg:hidden">md</div>
        <div className="hidden lg:block xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
    </div>
  );
}
