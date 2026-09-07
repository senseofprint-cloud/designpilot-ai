import React from 'react'

const VARIANTS = {
  primary: 'grad-primary text-white shadow-card hover:-translate-y-0.5 hover:shadow-lifted',
  ghost: 'bg-white text-brand-navy border border-brand-border hover:border-brand-purple hover:text-brand-purple',
  dark: 'bg-brand-navy text-white hover:bg-[#1c2040]',
  plain: 'bg-transparent text-brand-purple hover:underline'
}

const SIZES = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-base'
}

export default function Button({ variant = 'primary', size = 'md', block = false, className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function IconButton({ className = '', children, ...props }) {
  return (
    <button
      className={`w-9 h-9 rounded-xl bg-white border border-brand-border flex items-center justify-center hover:border-brand-purple hover:text-brand-purple transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
