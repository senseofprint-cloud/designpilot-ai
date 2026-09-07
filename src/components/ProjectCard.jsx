import React from 'react'
import { Copy, Trash2 } from 'lucide-react'
import { gradAt } from '../data/mockData.js'

const KIND_LABEL = { design: 'Design', brandkit: 'Brand Kit', campaign: 'Campaign', analysis: 'Analysis' }

export default function ProjectCard({ project, onOpen, onDuplicate, onDelete, compact = false }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-border bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-card">
      <button onClick={() => onOpen?.(project)} className={`w-full ${compact ? 'h-24' : 'h-[120px]'} ${gradAt(project.gradient)} flex items-center justify-center text-white font-display font-bold text-[15px] text-center px-3`}>
        {project.name}
      </button>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold truncate">{project.name}</div>
            <div className="text-[11.5px] text-brand-navySoft">{KIND_LABEL[project.kind] || project.kind} · {project.subtitle}</div>
          </div>
        </div>
        {!compact && (onDuplicate || onDelete) && (
          <div className="flex gap-1.5 mt-3">
            {onDuplicate && (
              <button onClick={() => onDuplicate(project.id)} className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-purple hover:text-brand-purple">
                <Copy size={13} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(project.id)} className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-pink hover:text-brand-pink">
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
