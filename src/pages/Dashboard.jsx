import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Stethoscope, Palette, Rocket } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Card, { CardHeader } from '../components/ui/Card.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { useProjects } from '../hooks/useProjects.js'

const QUICK_ACTIONS = [
  { icon: Sparkles, grad: 'grad-primary', title: 'Create Design', body: 'Start a new AI-generated design', to: '/app/create' },
  { icon: Stethoscope, grad: 'grad-cool', title: 'Analyze Design', body: 'Get a score on an existing design', to: '/app/doctor' },
  { icon: Palette, grad: 'grad-warm', title: 'Build Brand Kit', body: 'Generate colors, fonts & voice', to: '/app/brand-kit' },
  { icon: Rocket, grad: 'grad-vivid', title: 'Create Campaign', body: 'A full matched creative set', to: '/app/campaigns' }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { projects } = useProjects()

  const stats = [
    { label: 'Designs Created', value: projects.filter((p) => p.kind === 'design').length + 26, grad: 'grad-vivid' },
    { label: 'Projects Saved', value: projects.length, grad: 'grad-cool' },
    { label: 'Brand Kits', value: projects.filter((p) => p.kind === 'brandkit').length + 4, grad: 'grad-warm' },
    { label: 'AI Generations', value: 142, grad: 'grad-dark' }
  ]

  return (
    <div>
      <div className="flex justify-between items-end flex-wrap gap-3.5 mb-6">
        <div>
          <h1 className="text-[27px] font-bold mb-1.5">Good morning 👋</h1>
          <p className="text-brand-navySoft text-[14.5px] m-0">Ready to create something amazing?</p>
        </div>
        <Button onClick={() => navigate('/app/create')}>+ Create Design</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl2 p-5 text-white relative overflow-hidden min-h-[104px] ${s.grad}`}>
            <div className="text-[12.5px] font-semibold opacity-90">{s.label}</div>
            <div className="font-display text-[30px] font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {QUICK_ACTIONS.map((q) => (
          <button
            key={q.title}
            onClick={() => navigate(q.to)}
            className="bg-white border border-brand-border rounded-xl2 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center text-white mb-3.5 ${q.grad}`}>
              <q.icon size={17} />
            </div>
            <h4 className="text-[14.5px] font-semibold mb-1">{q.title}</h4>
            <p className="text-[12.5px] text-brand-navySoft m-0">{q.body}</p>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Recent Projects"
          action={<button onClick={() => navigate('/app/projects')} className="text-[13px] font-semibold text-brand-purple">View all</button>}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => navigate('/app/workspace')} />
          ))}
        </div>
      </Card>
    </div>
  )
}
