import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import TemplateCard from '../components/TemplateCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { TEMPLATES, TEMPLATE_CATEGORIES, STYLES } from '../data/mockData.js'
import { useToast } from '../context/ToastContext.jsx'
import { useNavigate } from 'react-router-dom'
import { LayoutTemplate } from 'lucide-react'

export default function Templates() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [style, setStyle] = useState('All')
  const { showToast } = useToast()
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || t.category === category
      const matchesStyle = style === 'All' || t.style === style
      return matchesQuery && matchesCategory && matchesStyle
    })
  }, [query, category, style])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[27px] font-bold mb-1.5">Template Library</h1>
        <p className="text-brand-navySoft text-[14.5px] m-0">Categorized starting points across every use case.</p>
      </div>

      <div className="flex items-center gap-2.5 bg-white border border-brand-border rounded-full px-4 py-2.5 mb-5 max-w-md">
        <Search size={16} className="text-brand-navySoft flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {TEMPLATE_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] font-semibold transition-colors ${
              category === c ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white border-brand-border text-brand-navySoft hover:border-brand-purple'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...STYLES].map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3.5 py-1.5 rounded-full border text-[12px] font-semibold transition-colors ${
              style === s ? 'grad-primary text-white border-transparent' : 'bg-white border-brand-borderSoft text-brand-navySoft hover:border-brand-purple'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={LayoutTemplate}
          title="No templates match"
          description="Try a different search term or clear your filters."
          actionLabel="Clear filters"
          onAction={() => { setQuery(''); setCategory('All'); setStyle('All') }}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} onUse={() => { showToast(`Loaded "${t.name}" into Workspace`); navigate('/app/workspace') }} />
          ))}
        </div>
      )}
    </div>
  )
}
