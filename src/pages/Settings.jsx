import React, { useState } from 'react'
import { Sparkles, Copy } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { generateCopy } from '../services/aiService.js'
import { useToast } from '../context/ToastContext.jsx'

export default function Settings() {
  const [name, setName] = useState('Shahzad')
  const [business, setBusiness] = useState('DesignPilot Demo Workspace')
  const [briefInput, setBriefInput] = useState('20% discount on summer shoes')
  const [copy, setCopy] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  async function handleGenerateCopy() {
    setLoading(true)
    const result = await generateCopy(briefInput)
    setCopy(result)
    setLoading(false)
  }

  function copyText(text) {
    navigator.clipboard?.writeText(text)
    showToast('Copied')
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">Settings</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">Account, plan and workspace preferences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
        <Card>
          <CardHeader title="Profile" />
          <Field label="Name" value={name} onChange={setName} />
          <Field label="Business" value={business} onChange={setBusiness} />
          <Button onClick={() => showToast('Settings saved')}>Save Changes</Button>
        </Card>

        <Card>
          <CardHeader title="AI Copy Assistant" />
          <Field label="What's the offer or message?" value={briefInput} onChange={setBriefInput} />
          <Button variant="ghost" onClick={handleGenerateCopy} disabled={loading}>
            <Sparkles size={15} /> {loading ? 'Generating…' : 'Generate Headlines & CTAs'}
          </Button>

          {copy && (
            <div className="mt-4 space-y-2">
              {copy.headlines.map((h) => (
                <CopyChip key={h} text={h} onCopy={() => copyText(h)} />
              ))}
              <div className="text-[11.5px] font-bold text-brand-navySoft uppercase tracking-wide mt-3 mb-1.5">CTA Options</div>
              {copy.ctas.map((c) => (
                <CopyChip key={c} text={c} onCopy={() => copyText(c)} />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white transition-colors"
      />
    </div>
  )
}

function CopyChip({ text, onCopy }) {
  return (
    <div className="flex justify-between items-center bg-brand-bg border border-brand-border rounded-xl px-3.5 py-3 text-[13.5px]">
      <span>{text}</span>
      <button onClick={onCopy} className="text-brand-purple font-bold text-xs flex items-center gap-1"><Copy size={12} /> Copy</button>
    </div>
  )
}
