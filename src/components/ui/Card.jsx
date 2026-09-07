import React from 'react'

export default function Card({ className = '', children, hover = false, ...props }) {
  return (
    <div
      className={`bg-white border border-brand-border rounded-xl2 p-5 ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-card' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[17px] font-semibold m-0">{title}</h3>
      {action}
    </div>
  )
}
