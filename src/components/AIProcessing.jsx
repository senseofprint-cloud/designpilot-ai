import React, { useEffect, useState } from 'react'

const DEFAULT_STEPS = [
  'Understanding your brand…',
  'Analyzing your audience…',
  'Choosing visual direction…',
  'Optimizing typography…',
  'Creating design concepts…'
]

/**
 * Plays through a sequence of "AI thinking" steps, then calls onDone.
 * props: { title, steps?, stepMs?, onDone }
 */
export default function AIProcessing({ title, steps = DEFAULT_STEPS, stepMs = 700, onDone }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= steps.length - 1) {
      const t = setTimeout(() => onDone?.(), stepMs)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), stepMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const progress = ((index + 1) / steps.length) * 100

  return (
    <div className="text-center py-16 px-5">
      <div className="w-24 h-24 rounded-full grad-vivid mx-auto mb-7 animate-pulseOrb" />
      {title && <h3 className="text-[19px] font-semibold mb-1.5">{title}</h3>}
      <div className="text-brand-navySoft text-sm min-h-[20px]">{steps[index]}</div>
      <div className="max-w-xs mx-auto mt-5 h-[7px] rounded-full bg-brand-borderSoft overflow-hidden">
        <div className="h-full grad-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
