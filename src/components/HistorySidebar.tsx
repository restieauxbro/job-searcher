"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";

const Sidebar = ({
  history,
}: {
  history:
    | {
        employer: string | null;
        id: number;
        job_title: string | null;
        slug: string | null;
        created_at: string;
      }[]
    | null;
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <>
      <div className="sticky top-0 left-0 h-screen flex-none overflow-x-hidden">
        {/* <PopOver triggerElement={<Button>Click me</Button>} align="start">
        <div className="text-xl">Hello world</div>
      </PopOver> */}
        <div className="h-full p-4">
          <div className="overflow-hidden rounded-lg border border-neutral-600/30 bg-neutral-50 bg-clip-padding pb-4 shadow-md shadow-neutral-300 dark:border-zinc-300/10 dark:bg-zinc-850/50 dark:shadow-black/30 h-[calc(100lvh-2rem)]">
            <div className="relative mb-4 h-12 border-b border-neutral-300 bg-neutral-200 dark:border-zinc-700 dark:bg-zinc-850">
              <motion.div
                className="absolute top-4 left-0 w-full whitespace-nowrap px-6 text-sm font-extrabold opacity-0"
                initial={false}
                animate={{ opacity: sidebarOpen ? 1 : 0 }}
              >
                History
              </motion.div>
              <motion.div
                className="absolute top-0 right-0 m-2"
                initial={false}
                animate={{ x: sidebarOpen ? 0 : -7 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <div className="w-4">
                    {sidebarOpen ? (
                      <ChevronLeft size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="grid overflow-x-hidden"
              initial={false}
              animate={{ width: sidebarOpen ? 325 : 65 }}
            >
              {history?.map((cv) => (
                <Link href={`/?j=${cv.id}`} className="w-[325px]" key={cv.id}>
                  <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-300">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {cv.job_title}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {cv.employer}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {/* {new Date(cv.created_at).toLocaleDateString()} */}
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;