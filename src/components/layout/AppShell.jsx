import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import BottomNav, { MobileTopbar } from './BottomNav.jsx'
import AIAssistant from '../AIAssistant.jsx'

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <Topbar />
        <div className="px-4 md:px-8 py-6 md:py-7 pb-24 md:pb-16 max-w-[1180px] w-full mx-auto">
          <Outlet />
        </div>
      </div>
      <BottomNav />
      <AIAssistant />
    </div>
  )
}
