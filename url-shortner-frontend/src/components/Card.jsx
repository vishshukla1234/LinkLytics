import React from 'react'
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='bg-white border border-slate-100 flex flex-col p-6 sm:p-8 gap-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200'
    >
      <h3 className='text-primary-navy text-xl font-bold font-montserrat'>{title}</h3>
      <p className='text-slate-600 text-sm leading-relaxed'>{desc}</p>
    </motion.div>
  )
}

export default Card