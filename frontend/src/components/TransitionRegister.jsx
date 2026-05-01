import {motion} from 'framer-motion'
import React from 'react'

const TransitionRegister = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="w-full h-screen"
  >
    {children}
  </motion.div>
);
export default TransitionRegister
