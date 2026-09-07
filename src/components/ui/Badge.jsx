import React from 'react'

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-[10.5px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${className}`}>
      {children}
    </span>
  )
}
