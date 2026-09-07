import React, { useState } from 'react'
import {
  LayoutTemplate, Type, Image as ImageIcon, Shapes, Palette, Sparkles, Wand2,
} from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { useToast } from '../context/ToastContext.jsx'

const TOOLS = [
  { key: 'templates', label: 'Templates', icon: LayoutTemplate },
  { key: 'text', label: 'Text', icon: Type },
  { key: 'images', label: 'Images', icon: ImageIcon },
  { key: 'shapes', label: 'Shapes', icon: Shapes },
  { key: 'colors', label: 'Colors', icon: Palette },
  { key: 'brandkit', label: 'Brand Kit', icon: Sparkles },
  { key: 'ai', label: 'AI Tools', icon: Wand2 }
]

const AI_ACTIONS = ['AI Improve', 'Generate Variation', 'Generate Copy', 'Change Style', 'Make More Premium', 'Make More Minimal']

export default function Workspace() {
  const [activeTool, setActiveTool] = useState('templates')
  const { showToast } = useToast()

  return (
    <div>
      <div className="flex justify-between items-end flex-wrap gap-3.5 mb-6">
        <div>
          <h1 className="text-[27px] font-bold mb-1.5">Design Workspace</h1>
          <p className="text-brand-navySoft text-[14.5px] m-0">Fine-tune your design before you export it.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => showToast('Style changed')}>Change Style</Button>
          <Button size="sm" onClick={() => showToast('Exported as PNG')}>Download</Button>
        </div>
      </div>

      <div className="grid grid-cols-[210px_1fr_240px] border border-brand-border rounded-xl2 overflow-hidden bg-white min-h-[560px] max-lg:grid-cols-1">
        <div className="p-4.5 p-[18px] border-r border-brand-borderSoft max-lg:hidden">
          {TOOLS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTool(t.key)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-[10px] text-[13px] font-semibold mb-0.5 transition-colors ${
                activeTool === t.key ? 'grad-primary text-white' : 'text-brand-navySoft hover:bg-brand-borderSoft hover:text-brand-navy'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="canvas-backdrop flex items-center justify-center p-9">
          <div className="w-[300px] h-[380px] md:w-[340px] md:h-[420px] rounded-2xl shadow-lifted grad-vivid flex flex-col justify-between p-6 text-white">
            <span className="self-start bg-white/20 text-[11px] font-bold uppercase px-2.5 py-1 rounded-full">Instagram · Sale</span>
            <div className="font-display font-bold text-2xl md:text-[26px] leading-tight">Weekend Flash Sale — 30% Off</div>
            <span className="self-start bg-white text-brand-navy font-bold text-[13px] px-4.5 py-2.5 rounded-full">Shop Now</span>
          </div>
        </div>

        <div className="p-[18px] border-l border-brand-borderSoft max-lg:hidden">
          <SectionLabel first>AI Actions</SectionLabel>
          {AI_ACTIONS.map((a) => (
            <Button key={a} variant="ghost" size="sm" block className="mb-1.5" onClick={() => showToast(`${a} applied`)}>
              {a === 'AI Improve' && <Sparkles size={14} />} {a}
            </Button>
          ))}
          <SectionLabel>Colors</SectionLabel>
          <div className="flex gap-1.5">
            {['#7C3AED', '#2563EB', '#EC4899', '#F97316'].map((c) => (
              <span key={c} style={{ background: c }} className="w-6 h-6 rounded-[7px] border-[1.5px] border-white shadow-[0_0_0_1px_#E8E5F6]" />
            ))}
          </div>
          <SectionLabel>Typography</SectionLabel>
          <div className="font-display font-bold text-[15px]">Space Grotesk / Inter</div>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children, first = false }) {
  return <div className={`text-[11.5px] font-bold text-brand-navySoft uppercase tracking-wide ${first ? 'mt-0' : 'mt-4'} mb-2`}>{children}</div>
}
