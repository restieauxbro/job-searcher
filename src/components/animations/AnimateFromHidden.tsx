import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { easy } from "@/lib/animations"

const AnimateFromHidden = ({
  show,
  children,
  horizontal,
  initial,
  animate,
  exit,
  transition,
  animateOnMount,
  style,
}: {
  show: boolean
  children: React.ReactNode
  horizontal?: boolean
  initial?: object | boolean
  animate?: object
  exit?: object
  transition?: object
  animateOnMount?: boolean
  style?: object
}) => {
  const usewrap = () => {
    if (horizontal === true) {
      return "nowrap"
    } else {
      return "normal"
    }
  }
  const initialAnim = animateOnMount === null ? true : animateOnMount
  return (
    <AnimatePresence initial={initialAnim}>
      {show && (
        <motion.div
          key="anim"
          className="animate-from-hidden"
          style={{ overflow: "hidden", whiteSpace: usewrap(), ...style }}
          initial={
            horizontal
              ? { width: 0, opacity: 0 }
              : initial === false
              ? false
              : initial || { height: 0, opacity: 0 }
          }
          animate={
            horizontal
              ? { width: "auto", opacity: 1 }
              : animate
              ? animate
              : { height: "auto", opacity: 1 }
          }
          exit={
            horizontal
              ? { width: 0, opacity: 0 }
              : exit
              ? exit
              : { height: 0, opacity: 0 }
          }
          transition={
            transition
              ? transition
              : {
                  ease: easy,
                  duration: 0.8,
                }
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimateFromHidden
