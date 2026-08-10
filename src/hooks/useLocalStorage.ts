import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as T
      if (typeof initialValue === 'function') {
        // @ts-ignore
        return initialValue()
      }
      return initialValue
    } catch {
      if (typeof initialValue === 'function') {
        // @ts-ignore
        return initialValue()
      }
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [key, state])

  return [state, setState] as const
}
