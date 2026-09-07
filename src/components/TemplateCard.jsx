import React from 'react'
import Button from './ui/Button.jsx'
import { gradAt } from '../data/mockData.js'

export default function TemplateCard({ template, onUse }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-border bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-card">
      <div className={`h-[150px] flex items-center justify-center text-white font-display font-bold text-center px-4 text-sm ${gradAt(template.gradient)}`}>
        {template.name}
      </div>
      <div className="p-3.5">
        <div className="text-[11px] text-brand-purple font-bold mb-0.5">{template.category} · {template.style}</div>
        <div className="text-[13.5px] font-bold mb-3">{template.name}</div>
        <Button variant="ghost" size="sm" block onClick={() => onUse?.(template)}>Use Template</Button>
      </div>
    </div>
  )
}
