import React from 'react'

function scoreColor(value) {
  if (value >= 80) return '#84CC16'
  if (value >= 60) return '#F97316'
  return '#EC4899'
}

export default function ProgressScore({ label, value }) {
  return (
    <div className="py-3 border-b border-brand-borderSoft last:border-b-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm font-bold" style={{ color: scoreColor(value) }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-brand-borderSoft overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: scoreColor(value) }}
        />
      </div>
    </div>
  )
}

export function StarScore({ label, stars, max = 5 }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-borderSoft last:border-b-0">
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-[15px] tracking-widest">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < stars ? 'text-brand-orange' : 'text-brand-border'}>★</span>
        ))}
      </span>
    </div>
  )
}
