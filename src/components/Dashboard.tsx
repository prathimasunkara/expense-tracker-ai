import React, { useMemo } from 'react'
import type { Expense } from '../types'
import { formatCurrency } from '../utils/format'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#6366f1',
  Rent: '#06b6d4',
  Utilities: '#f59e0b',
  Entertainment: '#ef4444',
  Transport: '#10b981',
  Other: '#94a3b8'
}

function aggregateByDate(expenses: Expense[]) {
  // totals per date in current month (sorted)
  const map: Record<string, number> = {}
  expenses.forEach(e => {
    map[e.date] = (map[e.date] || 0) + e.amount
  })
  const arr = Object.keys(map).sort().map(date => ({ date, total: Math.round((map[date] + Number.EPSILON) * 100) / 100 }))
  return arr
}

function categoryBreakdown(expenses: Expense[]) {
  const map: Record<string, number> = {}
  expenses.forEach(e => {
    map[e.category] = (map[e.category] || 0) + e.amount
  })
  const arr = Object.keys(map).map(k => ({ name: k, value: Math.round((map[k] + Number.EPSILON) * 100) / 100 }))
  return arr
}

export default function Dashboard({ expenses }: { expenses: Expense[] }) {
  const daily = useMemo(() => aggregateByDate(expenses), [expenses])
  const byCategory = useMemo(() => categoryBreakdown(expenses), [expenses])

  const total = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses])
  const topCategory = useMemo(() => {
    const map: Record<string, number> = {}
    expenses.forEach(e => map[e.category] = (map[e.category] || 0) + e.amount)
    const entries = Object.entries(map)
    if (!entries.length) return '-'
    const top = entries.sort((a,b) => b[1]-a[1])[0]
    return `${top[0]} (${formatCurrency(top[1])})`
  }, [expenses])

  const today = new Date()
  const daysPassed = Math.max(1, today.getDate())
  const avgDaily = total / daysPassed

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft card-hover">
          <h4 className="text-sm text-slate-500 dark:text-slate-300">Total this month</h4>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(total)}</div>
              <div className="text-sm text-slate-400">Across {expenses.length} transactions</div>
            </div>
            <div className="text-green-500 text-sm">▲ {expenses.length ? Math.max(0, Math.round((total / 100) * 10)) : 0}%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft card-hover">
          <h4 className="text-sm text-slate-500 dark:text-slate-300">Top category</h4>
          <div className="mt-2">
            <div className="text-lg font-semibold">{topCategory}</div>
            <div className="text-sm text-slate-400">Most spent category this month</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft card-hover">
          <h4 className="text-sm text-slate-500 dark:text-slate-300">Avg. daily spend</h4>
          <div className="mt-2">
            <div className="text-2xl font-semibold">{formatCurrency(avgDaily)}</div>
            <div className="text-sm text-slate-400">Based on {daysPassed} days</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft chart-animate">
          <h3 className="font-medium text-slate-700 dark:text-slate-200">Monthly spending</h3>
          <div style={{ height: 220 }} className="mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <XAxis dataKey="date" tick={{ fill: 'currentColor' }} />
                <YAxis tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft chart-animate">
          <h3 className="font-medium text-slate-700 dark:text-slate-200">By category</h3>
          <div style={{ height: 220 }} className="mt-3 flex items-center">
            {byCategory.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={4} label>
                    {byCategory.map((entry, idx) => (
                      <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-slate-400">No data for categories</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
