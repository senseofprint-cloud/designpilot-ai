import React, { useState } from 'react'
import { Sparkles, RotateCcw } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card.jsx'
import ColorSwatch from '../components/ui/ColorSwatch.jsx'
import Button from '../components/ui/Button.jsx'
import Skeleton from '../components/ui/Skeleton.jsx'
import { generateBrandKit } from '../services/aiService.js'
import { useProjects } from '../hooks/useProjects.js'
import { useToast } from '../context/ToastContext.jsx'

const EMPTY = { business: '', industry: '', audience: '', personality: '', style: '' }

export default function BrandKit() {
  const [form, setForm] = useState(EMPTY)
  const [kit, setKit] = useState(null)
  const [loading, setLoading] = useState(false)
  const { addProject } = useProjects()
  const { showToast } = useToast()

  function update(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  async function handleGenerate() {
    setLoading(true)
    const result = await generateBrandKit(form)
    setKit(result)
    setLoading(false)
  }

  function handleSave() {
    addProject({ kind: 'brandkit', name: `${form.business || 'Brand'} Brand Kit`, subtitle: 'Brand Kit', gradient: 5, data: kit })
    showToast('Brand kit saved to My Projects')
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">AI Brand Kit</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">One consistent visual identity for every design you make.</p>
      </div>

      <Card className="mb-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <TextField label="Business name" value={form.business} onChange={(v) => update('business', v)} placeholder="e.g. Brewline Coffee" />
          <TextField label="Industry" value={form.industry} onChange={(v) => update('industry', v)} placeholder="e.g. Food & beverage" />
          <TextField label="Target audience" value={form.audience} onChange={(v) => update('audience', v)} placeholder="e.g. Young professionals" />
          <TextField label="Brand personality" value={form.personality} onChange={(v) => update('personality', v)} placeholder="e.g. Modern, Confident, Friendly, Premium" />
        </div>
        <Button onClick={handleGenerate} disabled={loading}>
          <Sparkles size={16} /> {loading ? 'Generating…' : 'Generate Brand Kit'}
        </Button>
      </Card>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-[120px]" />)}
        </div>
      )}

      {kit && !loading && (
        <div className="space-y-6">
          <Card>
            <CardHeader title="Color Palette" action={<Button variant="ghost" size="sm" onClick={handleGenerate}><RotateCcw size={14} /> Regenerate</Button>} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              <ColorSwatch label="Primary" hex={kit.palette.primary} />
              <ColorSwatch label="Secondary" hex={kit.palette.secondary} />
              <ColorSwatch label="Accent" hex={kit.palette.accent} />
              <ColorSwatch label="Background" hex={kit.palette.background} />
              <ColorSwatch label="Text" hex={kit.palette.text} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Typography" />
            <div className="bg-brand-bg border border-brand-border rounded-xl p-6">
              <div className="font-display font-bold text-3xl mb-3">{form.business || 'Your Brand'} — Display Heading</div>
              <div className="font-display font-semibold text-lg mb-3">Section heading in {kit.typography.heading}</div>
              <div className="text-[14.5px] text-brand-navySoft">Body copy set in {kit.typography.body} — used for captions, descriptions and long-form text. Accent moments use {kit.typography.accent}.</div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Brand Personality" />
            <div className="flex flex-wrap gap-2">
              {kit.personalityTags.map((tag) => (
                <span key={tag} className="grad-primary text-white text-[13px] font-semibold px-3.5 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Visual Direction" />
            <DirectionRow label="Image style" value={kit.visualDirection.imageStyle} />
            <DirectionRow label="Layout style" value={kit.visualDirection.layoutStyle} />
            <DirectionRow label="Shape language" value={kit.visualDirection.shapeLanguage} />
            <DirectionRow label="Icon style" value={kit.visualDirection.iconStyle} />
            <DirectionRow label="Social media style" value={kit.visualDirection.socialStyle} />
          </Card>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleSave}>Save Brand Kit</Button>
            <Button variant="ghost" onClick={handleGenerate}>Generate Another Brand Kit</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white transition-colors"
      />
    </div>
  )
}

function DirectionRow({ label, value }) {
  return (
    <div className="flex gap-2 text-sm py-2 border-b border-brand-borderSoft last:border-b-0">
      <b className="text-brand-navySoft font-semibold min-w-[140px] flex-shrink-0">{label}</b>
      <span>{value}</span>
    </div>
  )
}
