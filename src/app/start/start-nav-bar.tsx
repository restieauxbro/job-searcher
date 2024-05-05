"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface IStartNavBarProps {}

export function StartNavBar(props: IStartNavBarProps) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {!pathname.includes("customizer") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full grid place-items-center border-b p-1"
        >
          <div className="flex gap-8 flex-wrap">
            {["Style", "Import your CV", "Edit"].map((item, index) => (
              <Button
                key={item}
                variant={"ghost"}
                size={"sm"}
                className="text-neutral-500 text-xs"
              >
                {item}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
