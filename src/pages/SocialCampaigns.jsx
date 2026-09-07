import React, { useState } from 'react'
import { Sparkles, Pencil, RotateCcw, Bookmark, Download } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { IconButton } from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'
import AIProcessing from '../components/AIProcessing.jsx'
import { generateCampaign } from '../services/aiService.js'
import { useProjects } from '../hooks/useProjects.js'
import { useToast } from '../context/ToastContext.jsx'

export default function SocialCampaigns() {
  const [campaign, setCampaign] = useState('Summer Sale — 30% Off')
  const [business, setBusiness] = useState('ABC Clothing')
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [pieces, setPieces] = useState([])
  const { addProject } = useProjects()
  const { showToast } = useToast()

  async function handleGenerate() {
    setStatus('loading')
    const result = await generateCampaign(campaign || 'Campaign', business || 'Your Business')
    setPieces(result.pieces)
    setStatus('done')
  }

  function saveAll() {
    addProject({ kind: 'campaign', name: campaign, subtitle: `${business} · ${pieces.length} creatives`, gradient: 2, data: pieces })
    showToast('Campaign saved to My Projects')
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">Social Campaign Generator</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">One campaign idea, a full matched creative set.</p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-wrap gap-3.5 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[13px] font-semibold mb-1.5">Campaign</label>
            <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="e.g. Summer Sale — 30% Off"
              className="w-full rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[13px] font-semibold mb-1.5">Business</label>
            <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="e.g. ABC Clothing"
              className="w-full rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white" />
          </div>
          <Button onClick={handleGenerate} disabled={status === 'loading'}>
            <Sparkles size={16} /> Generate Campaign
          </Button>
        </div>
      </Card>

      {status === 'loading' && (
        <Card>
          <AIProcessing
            title="Building your campaign pack…"
            steps={['Reading your brief…', 'Matching brand tone…', 'Sizing for each platform…', 'Assembling the set…']}
            onDone={() => {}}
          />
        </Card>
      )}

      {status === 'done' && (
        <div>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-semibold m-0">{campaign} — {business}</h3>
            <span className="text-[13px] text-brand-navySoft">{pieces.length} creatives generated</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pieces.map((p) => (
              <div key={p.id} className="rounded-2xl overflow-hidden border border-brand-border bg-white transition-transform hover:-translate-y-1 hover:shadow-lifted">
                <div className={`aspect-[4/5] flex flex-col justify-between p-5 text-white ${p.gradient}`}>
                  <Badge>{p.tag}</Badge>
                  <div className="font-display font-bold text-xl leading-tight">{p.headline}</div>
                  <span className="self-start bg-white text-brand-navy text-[11.5px] font-bold px-3.5 py-2 rounded-full">Shop Now</span>
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div className="text-[13.5px] font-bold">{p.tag}</div>
                  <div className="flex gap-1.5">
                    <IconButton title="Edit" onClick={() => showToast(`Opening "${p.tag}" in Workspace`)}><Pencil size={14} /></IconButton>
                    <IconButton title="Regenerate" onClick={() => showToast(`Regenerating "${p.tag}"…`)}><RotateCcw size={14} /></IconButton>
                    <IconButton title="Save" onClick={() => showToast(`Saved "${p.tag}"`)}><Bookmark size={14} /></IconButton>
                    <IconButton title="Download" onClick={() => showToast(`"${p.tag}" downloaded`)}><Download size={14} /></IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Button onClick={saveAll}>Save Campaign to My Projects</Button>
          </div>
        </div>
      )}
    </div>
  )
}
