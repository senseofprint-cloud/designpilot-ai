import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, Sparkles, Palette, Megaphone, LayoutTemplate, Bell } from 'lucide-react'
import { useToast } from '../../context/ToastContext.jsx'

const BOTTOM_ITEMS = [
  { to: '/app/dashboard', label: 'Home', icon: LayoutGrid },
  { to: '/app/create', label: 'Create', icon: Sparkles },
  { to: '/app/brand-kit', label: 'Brand', icon: Palette },
  { to: '/app/campaigns', label: 'Campaign', icon: Megaphone },
  { to: '/app/templates', label: 'Templates', icon: LayoutTemplate }
]

export function MobileTopbar() {
  const { showToast } = useToast()
  return (
    <div className="md:hidden flex items-center justify-between px-4.5 py-3.5 bg-white border-b border-brand-borderSoft sticky top-0 z-20">
      <div className="flex items-center gap-2 font-display font-bold text-[16px]">
        <span className="w-7 h-7 rounded-lg grad-primary relative">
          <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-[3px] rotate-45" />
        </span>
        DesignPilot
      </div>
      <div className="flex items-center gap-2.5">
        <button onClick={() => showToast('No new notifications')} className="w-9 h-9 rounded-xl bg-white border border-brand-border flex items-center justify-center">
          <Bell size={16} />
        </button>
        <div className="w-9 h-9 rounded-full grad-warm text-white flex items-center justify-center font-display font-bold text-sm">S</div>
      </div>
    </div>
  )
}

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border z-[150] flex justify-around px-1 py-2">
      {BOTTOM_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-semibold px-2 py-1 rounded-lg ${isActive ? 'text-brand-purple' : 'text-brand-navySoft'}`}
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </div>
  )
}
