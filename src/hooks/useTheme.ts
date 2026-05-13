import { useCallback, useState } from 'react'
import { getStoredTheme, persistTheme, type Theme } from '../theme'

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === 'light' ? 'dark' : 'light'
      persistTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
