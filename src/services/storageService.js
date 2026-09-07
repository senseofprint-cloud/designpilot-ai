// Thin persistence layer around localStorage. Swap this out for a real
// backend later without touching the pages/components that call it —
// they only depend on the shapes below.

export const PROJECTS_KEY = 'designpilot_projects'

/**
 * A "project" is anything a user saves: a generated design, a brand kit,
 * a campaign pack, or a design-doctor analysis.
 * Shape: { id, kind: 'design'|'brandkit'|'campaign'|'analysis', name, subtitle, gradient, createdAt, data }
 */
export function createProject({ kind, name, subtitle, gradient, data = {} }) {
  return {
    id: `${kind}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    kind,
    name,
    subtitle,
    gradient,
    createdAt: new Date().toISOString(),
    data
  }
}

export const SEED_PROJECTS = [
  createProject({ kind: 'design', name: 'Ramadan Sale — IG Post', subtitle: 'Instagram · Sale', gradient: 0 }),
  createProject({ kind: 'design', name: 'Studio Launch Announcement', subtitle: 'LinkedIn · Announcement', gradient: 1 }),
  createProject({ kind: 'campaign', name: 'Coffee Loyalty Campaign', subtitle: 'Banner · Promo', gradient: 2 }),
  createProject({ kind: 'design', name: 'Autumn Collection Story', subtitle: 'Story · Product', gradient: 3 }),
  createProject({ kind: 'analysis', name: 'Homepage Hero Review', subtitle: 'Design Doctor', gradient: 4 }),
  createProject({ kind: 'brandkit', name: 'Brewline Coffee Brand Kit', subtitle: 'Brand Kit', gradient: 5 })
]

export function readProjects() {
  try {
    const raw = window.localStorage.getItem(PROJECTS_KEY)
    return raw ? JSON.parse(raw) : SEED_PROJECTS
  } catch {
    return SEED_PROJECTS
  }
}

export function writeProjects(projects) {
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
}
