import * as React from "react";
import EditChecklist from "./edit-checklist";

export interface IWriteNewPageProps {}

export default function WriteNewPage(props: IWriteNewPageProps) {
  return (
    <div className="flex gap-8">
      <EditChecklist />
      Hi!
    </div>
  );
}
