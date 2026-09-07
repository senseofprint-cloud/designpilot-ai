import React from 'react'

export default function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export function SkeletonGrid({ count = 4, className = 'h-40' }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </div>
  )
}
