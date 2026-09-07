import { useEffect, useState } from 'react'

/**
 * Generic React hook that syncs state with localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}"`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`Could not write localStorage key "${key}"`, err)
    }
  }, [key, value])

  return [value, setValue]
}
