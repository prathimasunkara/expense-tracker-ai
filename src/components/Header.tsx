import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function Header({ onAddClick }: { onAddClick: () => void }) {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  return (
    <header className="bg-gradient-to-r from-white/70 to-slate-50 dark:from-slate-900 dark:to-slate-900/80 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-indigo-500/10 text-indigo-600 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Expense Tracker</h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">Personal finance dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onAddClick} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:brightness-105 transition">
            + Add Expense
          </button>

          <button
            onClick={() => setDark(d => !d)}
            className={clsx('p-2 rounded-lg border', dark ? 'bg-slate-700 border-slate-700 text-yellow-300' : 'bg-white border-slate-200 text-slate-700')}
            aria-label="Toggle dark mode"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
