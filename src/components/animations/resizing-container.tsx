import { motion } from "framer-motion";
import { useMeasure } from "react-use";

import { cn } from "@/lib/utils";

function ResizingContainer({
  children,
  transition,
  className,
  heightOnly,
}: {
  children: React.ReactNode;
  transition?: object;
  className?: string;
  heightOnly?: boolean;
}) {
  const [ref, { width, height }] = useMeasure();

  return (
    <motion.div
      animate={{ height, width: heightOnly ? "100%" : width }}
      className={cn("", className)}
      {...(transition && { transition })}
    >
      <div
        //@ts-ignore
        ref={ref}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default ResizingContainer;
