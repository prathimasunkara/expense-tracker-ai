import React, { useEffect, useState } from 'react'
import type { Expense, Category } from '../types'

const CATEGORIES: Category[] = ['Food','Rent','Utilities','Entertainment','Transport','Other']

export default function ExpenseForm({
  open,
  editing,
  onClose,
  onSave,
  onDelete
}: {
  open: boolean
  editing: Expense | null
  onClose: () => void
  onSave: (payload: Omit<Expense, 'id'> | Partial<Expense>, id?: string) => void
  onDelete: (id: string) => void
}) {
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<Category>('Food')
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10))
  const [notes, setNotes] = useState<string>('')

  useEffect(() => {
    if (editing) {
      setAmount(String(editing.amount))
      setCategory(editing.category)
      setDate(editing.date.slice(0,10))
      setNotes(editing.notes || '')
    } else {
      setAmount('')
      setCategory('Food')
      setDate(new Date().toISOString().slice(0,10))
      setNotes('')
    }
  }, [editing, open])

  if (!open) return null

  const handleSave = () => {
    const val = parseFloat(amount || '0')
    if (!val || val <= 0) {
      alert('Please enter a valid amount')
      return
    }
    const payload: Omit<Expense, 'id'> = { amount: val, category, date, notes }
    onSave(payload, editing?.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{editing ? 'Edit expense' : 'Add expense'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <div className="text-sm text-slate-500">Amount</div>
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" step="0.01" className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-500">Category</div>
            <select value={category} onChange={e => setCategory(e.target.value as Category)} className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="block">
            <div className="text-sm text-slate-500">Date</div>
            <input value={date} onChange={e => setDate(e.target.value)} type="date" className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-500">Notes (optional)</div>
            <input value={notes} onChange={e => setNotes(e.target.value)} type="text" className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent" />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {editing && (
              <button onClick={() => editing && onDelete(editing.id)} className="text-sm text-red-500 hover:underline">
                Delete
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-2 rounded-lg bg-transparent border">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
