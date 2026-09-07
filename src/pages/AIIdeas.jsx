import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Skeleton from '../components/ui/Skeleton.jsx'
import { generateDesignIdeas } from '../services/aiService.js'
import { useToast } from '../context/ToastContext.jsx'
import { gradAt } from '../data/mockData.js'

export default function AIIdeas() {
  const [brief, setBrief] = useState('I need a creative post for my coffee shop.')
  const [loading, setLoading] = useState(false)
  const [concepts, setConcepts] = useState([])
  const { showToast } = useToast()

  async function handleGenerate() {
    setLoading(true)
    const result = await generateDesignIdeas(brief || 'a creative marketing post')
    setConcepts(result.concepts)
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[27px] font-bold mb-1.5">AI Design Ideas</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">Describe what you need — get back distinct creative directions.</p>
      </div>

      <Card className="mb-6">
        <label className="block text-[13px] font-semibold mb-1.5">What do you need?</label>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          className="w-full min-h-[84px] rounded-xl border-[1.5px] border-brand-border bg-brand-bg px-3.5 py-3 outline-none focus:border-brand-purple focus:bg-white mb-4"
        />
        <Button onClick={handleGenerate} disabled={loading}>
          <Sparkles size={16} /> {loading ? 'Generating…' : 'Get Ideas'}
        </Button>
      </Card>

      {loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-52" />)}
        </div>
      )}

      {!loading && concepts.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {concepts.map((c, i) => (
            <Card key={c.name}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-[30px] h-[30px] rounded-[9px] flex-shrink-0 ${gradAt(i)}`} />
                <h4 className="m-0 text-[15px] font-semibold">{c.name}</h4>
              </div>
              <IdeaRow label="Description" value={c.description} />
              <IdeaRow label="Colors" value={c.colors} />
              <IdeaRow label="Typography" value={c.typography} />
              <IdeaRow label="Layout" value={c.layout} />
              <IdeaRow label="Headline" value={`"${c.headline}"`} />
              <IdeaRow label="CTA" value={c.cta} />
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => showToast(`"${c.name}" sent to Create Design`)}>
                Use this concept →
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function IdeaRow({ label, value }) {
  return (
    <div className="flex gap-2 text-[13px] mb-1.5">
      <b className="text-brand-navySoft font-semibold min-w-[88px] flex-shrink-0">{label}</b>
      <span>{value}</span>
    </div>
  )
}
