# DesignPilot AI

An AI-powered design assistant SaaS — React + Vite + Tailwind CSS + React Router.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## What's inside

- **Landing page** (`/`) — marketing site with hero, features, how-it-works, pricing, FAQ.
- **App shell** (`/app/*`) — sidebar + topbar on desktop, bottom nav on mobile.
  - `/app/dashboard` — stats, quick actions, recent projects
  - `/app/create` — AI Design Generator (multi-step wizard → AI processing → generated concepts)
  - `/app/doctor` — Design Doctor (upload → scored report → improved version)
  - `/app/brand-kit` — AI Brand Kit generator (palette, type, personality, visual direction)
  - `/app/campaigns` — Social Campaign Generator (one idea → full creative pack)
  - `/app/ideas` — AI Design Ideas (brief → 4 concepts)
  - `/app/templates` — searchable/filterable template gallery
  - `/app/workspace` — mock design editor (canvas + tools + AI actions)
  - `/app/projects` — My Projects (search/filter/duplicate/delete, persisted to localStorage)
  - `/app/settings` — profile + AI Copy Assistant

## Architecture

```
src/
  components/
    ui/        Reusable primitives: Button, Card, Modal, Toast, ProgressScore, ColorSwatch, EmptyState, Skeleton, Badge
    layout/    Sidebar, Topbar, BottomNav, AppShell
    ...        DesignPreview, ProjectCard, TemplateCard, AIAssistant, AIProcessing, UploadBox, WizardSteps
  pages/       One file per route
  data/        Mock reference data (templates, style vocab, style options)
  services/    aiService.js (mock "AI" calls, swap-in point for a real API), storageService.js (localStorage)
  hooks/       useLocalStorage, useToast
  context/     ToastContext
```

## Connecting a real AI API later

Every "AI" call in the app goes through `src/services/aiService.js`. Each exported function
(`generateDesign`, `analyzeDesign`, `generateBrandKit`, `generateCampaign`, `generateDesignIdeas`,
`generateCopy`) currently returns mock data after a simulated delay. Replace the body of any function
with a real `fetch`/SDK call to your AI provider — the rest of the app (components, state, UI) doesn't
need to change, since it only depends on each function's return shape (documented in comments above
each function).

## Persistence

Saved designs, brand kits, campaigns and analyses are stored in `localStorage` under the key
`designpilot_projects`, via `src/services/storageService.js`. They persist across refreshes.
