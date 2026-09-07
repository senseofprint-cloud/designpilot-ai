import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Plus } from 'lucide-react'
import { useToast } from '../../context/ToastContext.jsx'

export default function Topbar() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  return (
    <div className="hidden md:flex items-center justify-between px-7 py-4 border-b border-brand-borderSoft bg-white/70 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-2.5 bg-brand-bg border border-brand-border rounded-full px-4 py-2.5 w-80 text-sm text-brand-navySoft">
        <Search size={16} />
        <input
          placeholder="Search projects, templates, brand kits…"
          className="bg-transparent outline-none w-full text-brand-navy"
          onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value) showToast(`Searching for "${e.currentTarget.value}"…`) }}
        />
      </div>
      <div className="flex items-center gap-3.5">
        <button onClick={() => navigate('/app/create')} className="grad-primary text-white text-[13px] font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:-translate-y-0.5 transition-transform">
          <Plus size={14} /> New Design
        </button>
        <div className="relative">
          <button onClick={() => showToast('No new notifications')} className="w-9 h-9 rounded-xl bg-white border border-brand-border flex items-center justify-center hover:border-brand-purple">
            <Bell size={16} />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-pink rounded-full border-2 border-white" />
        </div>
        <div className="w-9 h-9 rounded-full grad-warm text-white flex items-center justify-center font-display font-bold text-sm">S</div>
      </div>
    </div>
  )
}
