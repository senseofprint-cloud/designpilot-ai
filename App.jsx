import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DesignGenerator from './pages/DesignGenerator.jsx'
import DesignDoctor from './pages/DesignDoctor.jsx'
import BrandKit from './pages/BrandKit.jsx'
import SocialCampaigns from './pages/SocialCampaigns.jsx'
import AIIdeas from './pages/AIIdeas.jsx'
import Templates from './pages/Templates.jsx'
import Workspace from './pages/Workspace.jsx'
import MyProjects from './pages/MyProjects.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<DesignGenerator />} />
        <Route path="doctor" element={<DesignDoctor />} />
        <Route path="brand-kit" element={<BrandKit />} />
        <Route path="campaigns" element={<SocialCampaigns />} />
        <Route path="ideas" element={<AIIdeas />} />
        <Route path="templates" element={<Templates />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
