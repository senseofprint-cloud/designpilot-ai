import React from 'react'
import { RotateCcw, Download, Pencil, Bookmark } from 'lucide-react'
import Badge from './ui/Badge.jsx'
import { IconButton } from './ui/Button.jsx'

/**
 * A single generated-design "card": gradient visual + name/meta row + actions.
 * props: { concept: {name, gradient, headline, subheadline, cta, platform, style},
 *          onEdit, onRegenerate, onSave, onDownload }
 */
export default function DesignPreview({ concept, onEdit, onRegenerate, onSave, onDownload }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-border bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-lifted">
      <div className={`aspect-[4/5] flex flex-col justify-between p-5 text-white ${concept.gradient}`}>
        <Badge>{concept.platform}</Badge>
        <div>
          <div className="font-display font-bold text-xl leading-tight">{concept.headline}</div>
          <div className="text-xs opacity-90 mt-1.5">{concept.subheadline}</div>
        </div>
        <span className="self-start bg-white text-brand-navy text-[11.5px] font-bold px-3.5 py-2 rounded-full">{concept.cta}</span>
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[13.5px] font-bold">{concept.name}</div>
            <div className="text-[11px] text-brand-navySoft">{concept.style} style</div>
          </div>
        </div>
        <div className="text-[11.5px] text-brand-navySoft mb-3 leading-relaxed">
          <div><b className="text-brand-navy">Palette:</b> {concept.palette}</div>
          <div><b className="text-brand-navy">Type:</b> {concept.typography}</div>
        </div>
        <div className="flex gap-1.5">
          <IconButton title="Edit" onClick={onEdit}><Pencil size={15} /></IconButton>
          <IconButton title="Regenerate" onClick={onRegenerate}><RotateCcw size={15} /></IconButton>
          <IconButton title="Save" onClick={onSave}><Bookmark size={15} /></IconButton>
          <IconButton title="Download" onClick={onDownload}><Download size={15} /></IconButton>
        </div>
      </div>
    </div>
  )
}
