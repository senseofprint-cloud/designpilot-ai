import React from 'react'
import { Check } from 'lucide-react'

export default function WizardSteps({ labels, current }) {
  return (
    <div className="flex justify-between relative mb-9">
      <div className="absolute top-[17px] left-[5%] right-[5%] h-0.5 bg-brand-border z-0" />
      {labels.map((label, i) => {
        const num = i + 1
        const done = num < current
        const active = num === current
        return (
          <div key={label} className="relative z-10 flex flex-col items-center gap-2 flex-1">
            <div
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-display font-bold text-[13px] border-2 transition-all
                ${done ? 'grad-primary text-white border-transparent' : active ? 'border-brand-purple text-brand-purple shadow-[0_0_0_5px_rgba(124,58,237,0.14)]' : 'border-brand-border text-brand-navySoft bg-white'}`}
            >
              {done ? <Check size={15} /> : num}
            </div>
            <span className={`text-[11.5px] font-semibold text-center ${active ? 'text-brand-navy' : 'text-brand-navySoft'}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
