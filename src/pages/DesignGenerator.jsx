import React, { useState } from 'react'
import WizardSteps from '../components/WizardSteps.jsx'
import AIProcessing from '../components/AIProcessing.jsx'
import DesignPreview from '../components/DesignPreview.jsx'
import Button from '../components/ui/Button.jsx'
import { PLATFORMS, CONTENT_TYPES, STYLES } from '../data/mockData.js'
import { generateDesign } from '../services/aiService.js'
import { useProjects } from '../hooks/useProjects.js'
import { useToast } from '../context/ToastContext.jsx'

const STEP_LABELS = ['Business', 'Platform', 'Content', 'Style', 'Message']
const EMPTY = { business: '', category: '', audience: '', platform: '', contentType: '', style: '', message: '' }

export default function DesignGenerator() {
  const [step, setStep] = useState(1) // 1-5, 6 = processing, 7 = results
  const [form, setForm] = useState(EMPTY)
  const [concepts, setConcepts] = useState([])
  const { addProject } = useProjects()
  const { showToast } = useToast()

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleGenerate() {
    setStep(6)
    const result = await generateDesign(form)
    setConcepts(result.concepts)
    setStep(7)
  }

  function startOver() {
    setForm(EMPTY)
    setConcepts([])
    setStep(1)
  }

  function saveAll() {
    concepts.forEach((c) => {
      addProject({ kind: 'design', name: c.name, subtitle: `${form.platform} · ${c.style}`, gradient: 0, data: c })
    })
    showToast('Project saved to My Projects')
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">Create a New Design</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">Five quick steps and DesignPilot handles the rest.</p>
      </div>

      <div className="max-w-[760px] mx-auto">
        {step <= 5 && <WizardSteps labels={STEP_LABELS} current={step} />}

        {step === 6 && (
          <div className="bg-white border border-brand-border rounded-xl2 shadow-soft">
            <AIProcessing title={`Designing for ${form.business || 'your brand'}…`} onDone={() => {}} />
          </div>
        )}

        {step >= 1 && step <= 5 && (
          <div className="bg-white border border-brand-border rounded-xl2 p-8 shadow-soft">
            {step === 1 && (
              <StepBusiness form={form} update={update} />
            )}
            {step === 2 && (
              <StepPills
                title="Choose a platform"
                sub="We'll size and format the design to fit."
                options={PLATFORMS}
                value={form.platform}
                onSelect={(v) => update('platform', v)}
              />
            )}
            {step === 3 && (
              <StepPills
                title="Choose content type"
                sub="What is this design meant to do?"
                options={CONTENT_TYPES}
                value={form.contentType}
                onSelect={(v) => update('contentType', v)}
              />
            )}
            {step === 4 && (
              <StepPills
                title="Choose a visual style"
                sub="This shapes color, type and layout choices."
                options={STYLES}
                value={form.style}
                onSelect={(v) => update('style', v)}
              />
            )}
            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-1.5">What's the campaign or message?</h3>
                <p className="text-brand-navySoft text-sm mb-6">The offer, occasion, or campaign this design is for.</p>
                <div className="mb-4">
                  <label className="block text-[13px] font-semibold mb-1.5">Campaign / offer / message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="e.g. 20% off all bags this weekend only"
                    className="w-full min-h-[84px] rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-7">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} className={step === 1 ? 'invisible' : ''}>
                ← Back
              </Button>
              <Button onClick={() => (step === 5 ? handleGenerate() : setStep((s) => s + 1))}>
                {step < 5 ? 'Continue →' : '✨ Generate Designs'}
              </Button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-semibold m-0">{concepts.length} concepts ready for {form.business || 'your brand'}</h3>
              <Button variant="ghost" size="sm" onClick={startOver}>Start over</Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {concepts.map((c) => (
                <DesignPreview
                  key={c.id}
                  concept={c}
                  onEdit={() => showToast(`Opening "${c.name}" in Workspace`)}
                  onRegenerate={() => showToast(`Regenerating "${c.name}"…`)}
                  onSave={() => { addProject({ kind: 'design', name: c.name, subtitle: `${c.platform} · ${c.style}`, gradient: 0, data: c }); showToast(`Saved "${c.name}"`) }}
                  onDownload={() => showToast(`"${c.name}" downloaded`)}
                />
              ))}
            </div>
            <div className="text-center mt-7">
              <Button onClick={saveAll}>Save all to My Projects</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepBusiness({ form, update }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-1.5">Tell us about your business</h3>
      <p className="text-brand-navySoft text-sm mb-6">This grounds every design in who you actually are.</p>
      <Field label="Business name" value={form.business} onChange={(v) => update('business', v)} placeholder="e.g. Brewline Coffee" />
      <Field label="Business category" value={form.category} onChange={(v) => update('category', v)} placeholder="e.g. Specialty coffee shop" />
      <Field label="Target audience" value={form.audience} onChange={(v) => update('audience', v)} placeholder="e.g. Young professionals, 22–35" />
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-[18px]">
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

function StepPills({ title, sub, options, value, onSelect }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-1.5">{title}</h3>
      <p className="text-brand-navySoft text-sm mb-6">{sub}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className={`border-[1.5px] rounded-2xl px-2.5 py-4 text-center text-[13.5px] font-semibold transition-all ${
              value === o ? 'grad-primary text-white border-transparent shadow-card' : 'bg-white border-brand-border hover:border-brand-purple'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
