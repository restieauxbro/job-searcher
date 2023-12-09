import { MotionValue, useSpring, useTransform } from "framer-motion";

export const easy = [0.2, 0.43, 0, 1];

export function useSmoothTransform(
  value: MotionValue<number>,
  springOptions: {
    stiffness: number;
    damping: number;
  },
  transformer: (v: number) => number,
) {
  return useSpring(useTransform(value, transformer), springOptions);
}
