import type { Expense } from '../types'

export const SAMPLE_EXPENSES: Expense[] = [
  { id: 'e1', amount: 12.5, category: 'Food', date: new Date().toISOString().slice(0,10), notes: 'Lunch' },
  { id: 'e2', amount: 1200, category: 'Rent', date: (() => { const d = new Date(); d.setDate(1); return d.toISOString().slice(0,10) })(), notes: 'Monthly rent' },
  { id: 'e3', amount: 60, category: 'Utilities', date: new Date().toISOString().slice(0,10), notes: 'Electricity' },
  { id: 'e4', amount: 25, category: 'Transport', date: new Date().toISOString().slice(0,10), notes: 'Taxi' },
  { id: 'e5', amount: 45, category: 'Entertainment', date: new Date().toISOString().slice(0,10), notes: 'Movie & snacks' },
  { id: 'e6', amount: 35, category: 'Food', date: new Date().toISOString().slice(0,10), notes: 'Groceries' }
]
