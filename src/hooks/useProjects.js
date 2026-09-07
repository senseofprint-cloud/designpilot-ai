import { useLocalStorage } from './useLocalStorage.js'
import { createProject, PROJECTS_KEY, SEED_PROJECTS } from '../services/storageService.js'

export function useProjects() {
  const [projects, setProjects] = useLocalStorage(PROJECTS_KEY, SEED_PROJECTS)

  function addProject({ kind, name, subtitle, gradient, data }) {
    const project = createProject({ kind, name, subtitle, gradient, data })
    setProjects((prev) => [project, ...prev])
    return project
  }

  function removeProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  function duplicateProject(id) {
    setProjects((prev) => {
      const original = prev.find((p) => p.id === id)
      if (!original) return prev
      const copy = { ...original, id: `${original.kind}_${Date.now()}`, name: `${original.name} (copy)`, createdAt: new Date().toISOString() }
      return [copy, ...prev]
    })
  }

  return { projects, addProject, removeProject, duplicateProject }
}
