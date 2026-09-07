import React, { useMemo, useState } from 'react'
import { Search, FolderKanban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import { useProjects } from '../hooks/useProjects.js'
import { useToast } from '../context/ToastContext.jsx'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'design', label: 'Designs' },
  { key: 'brandkit', label: 'Brand Kits' },
  { key: 'campaign', label: 'Campaigns' },
  { key: 'analysis', label: 'Analyses' }
]

export default function MyProjects() {
  const { projects, removeProject, duplicateProject } = useProjects()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || p.kind === filter
      return matchesQuery && matchesFilter
    })
  }, [projects, query, filter])

  return (
    <div>
      <div className="flex justify-between items-end flex-wrap gap-3.5 mb-6">
        <div>
          <h1 className="text-[27px] font-bold mb-1.5">My Projects</h1>
          <p className="text-brand-navySoft text-[14.5px] m-0">Everything you've generated, in one place — saved to your browser.</p>
        </div>
        <Button onClick={() => navigate('/app/create')}>+ New Design</Button>
      </div>

      <div className="flex items-center gap-2.5 bg-white border border-brand-border rounded-full px-4 py-2.5 mb-4 max-w-md">
        <Search size={16} className="text-brand-navySoft flex-shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" className="w-full outline-none text-sm bg-transparent" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] font-semibold transition-colors ${
              filter === f.key ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white border-brand-border text-brand-navySoft hover:border-brand-purple'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No designs yet"
          description="Create your first professional design with AI."
          actionLabel="Start Creating"
          onAction={() => navigate('/app/create')}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={() => navigate('/app/workspace')}
              onDuplicate={(id) => { duplicateProject(id); showToast('Project duplicated') }}
              onDelete={(id) => { removeProject(id); showToast('Project deleted') }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
