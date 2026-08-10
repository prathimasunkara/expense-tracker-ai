import React, { useMemo, useState } from 'react'
import type { Expense } from '../types'
import { formatCurrency, formatDate } from '../utils/format'

export default function ExpenseTable({ expenses, onEdit, onDelete }: { expenses: Expense[]; onEdit: (e: Expense) => void; onDelete: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const cats = useMemo(() => Array.from(new Set(expenses.map(e => e.category))), [expenses])

  const filtered = useMemo(() => {
    return expenses.filter(e => {
      if (category !== 'All' && e.category !== category) return false
      if (startDate && e.date < startDate) return false
      if (endDate && e.date > endDate) return false
      if (query) {
        const q = query.toLowerCase()
        if (!String(e.amount).toLowerCase().includes(q) && !e.notes?.toLowerCase().includes(q) && !e.category.toLowerCase().includes(q) && !e.date.toLowerCase().includes(q)) return false
      }
      return true
    }).sort((a,b) => b.date.localeCompare(a.date))
  }, [expenses, query, category, startDate, endDate])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-medium">Transactions</h3>
        <div className="flex items-center gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search amount, notes, category..." className="rounded-lg border px-3 py-2 bg-transparent w-64" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg border px-3 py-2 bg-transparent">
            <option value="All">All</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="rounded-lg border px-3 py-2 bg-transparent" />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="rounded-lg border px-3 py-2 bg-transparent" />
        <button onClick={() => { setStartDate(''); setEndDate(''); setCategory('All'); setQuery('') }} className="ml-auto text-sm text-slate-500 hover:underline">Clear</button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-sm text-slate-500 dark:text-slate-300">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Notes</th>
              <th className="text-left py-2">Category</th>
              <th className="text-right py-2 pr-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} onClick={() => onEdit(row)} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <td className="py-3">{formatDate(row.date)}</td>
                <td className="py-3">{row.notes || '-'}</td>
                <td className="py-3">{row.category}</td>
                <td className="py-3 text-right pr-6">{formatCurrency(row.amount)}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-sm text-slate-400">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
