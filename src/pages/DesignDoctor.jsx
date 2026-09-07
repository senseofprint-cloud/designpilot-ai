import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import UploadBox from '../components/UploadBox.jsx'
import Card, { CardHeader } from '../components/ui/Card.jsx'
import ProgressScore from '../components/ui/ProgressScore.jsx'
import Button from '../components/ui/Button.jsx'
import { DOCTOR_CATEGORIES } from '../data/mockData.js'
import { analyzeDesign, improveDesign } from '../services/aiService.js'
import { useProjects } from '../hooks/useProjects.js'
import { useToast } from '../context/ToastContext.jsx'

export default function DesignDoctor() {
  const [status, setStatus] = useState('idle') // idle | analyzing | done
  const [report, setReport] = useState(null)
  const [improved, setImproved] = useState(null)
  const [improving, setImproving] = useState(false)
  const { addProject } = useProjects()
  const { showToast } = useToast()

  async function handleFile(file) {
    if (!file) return
    setStatus('analyzing')
    setImproved(null)
    const result = await analyzeDesign(file)
    setReport(result)
    setStatus('done')
  }

  async function handleImprove() {
    setImproving(true)
    const result = await improveDesign(report)
    setImproved(result)
    setImproving(false)
    addProject({ kind: 'analysis', name: 'Design Doctor Review', subtitle: 'Improved version', gradient: 4, data: result })
    showToast('Improved version saved to My Projects')
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">Design Doctor</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">Upload a design and get an honest, actionable critique.</p>
      </div>

      <UploadBox status={status} onFile={handleFile} />

      {report && (
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <Card>
            <CardHeader title="Design Score" />
            {DOCTOR_CATEGORIES.map((c) => (
              <ProgressScore key={c.key} label={c.label} value={report.scores[c.key]} />
            ))}
          </Card>

          <Card>
            <CardHeader title="What's working" />
            <ul className="space-y-2.5 mb-6">
              {report.working.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 size={16} className="text-brand-lime flex-shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
            <CardHeader title="What needs improvement" />
            <ul className="space-y-2.5 mb-6">
              {report.improve.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm">
                  <AlertTriangle size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
            <Button block onClick={handleImprove} disabled={improving}>
              <Sparkles size={16} /> {improving ? 'Improving…' : 'Improve My Design'}
            </Button>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader title="AI Notes" />
            <ul className="space-y-3">
              {report.notes.map((n, i) => (
                <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed">
                  <span className="w-7 h-7 rounded-lg grad-warm text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">!</span>
                  {n}
                </li>
              ))}
            </ul>
          </Card>

          {improved && (
            <Card className="md:col-span-2">
              <CardHeader title="Improved Version" />
              <div className={`rounded-2xl p-6 text-white flex flex-col justify-between min-h-[180px] ${improved.gradient}`}>
                <span className="self-start bg-white/20 backdrop-blur-sm text-[10.5px] font-bold uppercase px-2.5 py-1 rounded-full">Design Doctor</span>
                <div>
                  <div className="font-display font-bold text-xl">{improved.headline}</div>
                  <div className="text-xs opacity-90 mt-1.5">{improved.subheadline}</div>
                </div>
                <span className="self-start bg-white text-brand-navy text-[11.5px] font-bold px-3.5 py-2 rounded-full">{improved.cta}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {improved.notes.map((n, i) => (
                  <li key={i} className="text-sm text-brand-navySoft flex gap-2"><CheckCircle2 size={15} className="text-brand-lime flex-shrink-0 mt-0.5" />{n}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
