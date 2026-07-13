'use client'

import { useEffect } from 'react'
import { useProgressStore } from '@/lib/store/progress'

export function useThemeAndFont() {
  const theme = useProgressStore((state) => state.theme)
  const fontSize = useProgressStore((state) => state.fontSize)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement

    // Կիրառել թեման՝ օգտագործելով .dark class Tailwind-ի համար
    if (theme === 'auto') {
      // Հեռացնել data-theme, որ օգտագործվի prefers-color-scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
      root.classList.toggle('dark', prefersDark)

      // Լսել համակարգի թեմայի փոփոխությունը
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light')
        root.classList.toggle('dark', e.matches)
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      root.setAttribute('data-theme', theme)
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-font-size', fontSize)
  }, [fontSize])
}
