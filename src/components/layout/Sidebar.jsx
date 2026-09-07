import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutGrid, Sparkles, Palette, Stethoscope, Megaphone,
  Lightbulb, LayoutTemplate, FolderKanban, Settings, PenTool
} from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/app/create', label: 'AI Design Generator', icon: Sparkles },
  { to: '/app/doctor', label: 'Design Doctor', icon: Stethoscope },
  { to: '/app/brand-kit', label: 'Brand Kit', icon: Palette },
  { to: '/app/campaigns', label: 'Social Campaigns', icon: Megaphone },
  { to: '/app/ideas', label: 'AI Ideas', icon: Lightbulb },
  { to: '/app/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/app/workspace', label: 'Workspace', icon: PenTool },
  { to: '/app/projects', label: 'My Projects', icon: FolderKanban },
  { to: '/app/settings', label: 'Settings', icon: Settings }
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-[236px] flex-shrink-0 bg-white border-r border-brand-borderSoft flex-col p-4 sticky top-0 h-screen">
      <div className="flex items-center gap-2.5 font-display font-bold text-[17px] px-2.5 pb-6 pt-1.5">
        <span className="w-8 h-8 rounded-[10px] grad-primary relative flex-shrink-0">
          <span className="absolute inset-0 m-auto w-3.5 h-3.5 bg-white rounded-[4px] rotate-45" />
        </span>
        DesignPilot
      </div>
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14.5px] font-semibold transition-colors ${
                isActive ? 'grad-primary text-white shadow-soft' : 'text-brand-navySoft hover:bg-brand-borderSoft hover:text-brand-navy'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto bg-gradient-to-br from-[#F5F2FF] to-white border border-brand-border rounded-2xl p-3.5 text-[12.5px]">
        <div className="flex justify-between font-semibold">
          <b>AI Credits</b><span>320 / 500</span>
        </div>
        <div className="h-1.5 rounded-full bg-brand-borderSoft my-2 overflow-hidden">
          <div className="h-full grad-cool w-[64%]" />
        </div>
        <div className="text-brand-navySoft">Resets in 12 days</div>
      </div>
    </aside>
  )
}
