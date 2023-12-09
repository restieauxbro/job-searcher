import { AnimatePresence, motion } from "framer-motion"

import Styles from "@/styles/components/ellipsis-loader.module.scss"

const EllipsisLoader = () => {
  return (
    <div className={`${Styles.ellipsisLoader} ${Styles.small}`}>
      <div className={Styles.loaderDot} />
      <div className={Styles.loaderDot} />
      <div className={Styles.loaderDot} />
    </div>
  )
}

export default EllipsisLoader

export const EllipsisLoaderFade = (props: { show: boolean }) => {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <EllipsisLoader />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
