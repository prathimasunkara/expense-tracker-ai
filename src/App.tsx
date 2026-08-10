import React, { useEffect, useMemo, useState } from 'react'
import { Expense } from './types'
import { SAMPLE_EXPENSES } from './utils/sampleData'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses_v1', () => {
    // seed sample on first load
    return SAMPLE_EXPENSES
  })

  // Modal state for add/edit
  const [editing, setEditing] = useState<Expense | null>(null)
  const [isFormOpen, setFormOpen] = useState(false)

  useEffect(() => {
    // ensure dates are ISO-date-only (YYYY-MM-DD)
    setExpenses(prev => prev.map(e => ({ ...e, date: e.date.slice(0,10) })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addExpense = (payload: Omit<Expense, 'id'>) => {
    const newExp: Expense = { id: uuidv4(), ...payload }
    setExpenses(prev => [newExp, ...prev])
  }

  const updateExpense = (id: string, patch: Partial<Expense>) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e))
  }

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  // handlers for opening form
  const openNew = () => { setEditing(null); setFormOpen(true) }
  const openEdit = (e: Expense) => { setEditing(e); setFormOpen(true) }

  // derived: current month expenses
  const now = new Date()
  const monthKey = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}`
  const thisMonthExpenses = useMemo(() => {
    return expenses.filter(e => {
      const d = new Date(e.date)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    })
  }, [expenses, now.getFullYear(), now.getMonth()])

  return (
    <div className="min-h-screen pb-12">
      <Header onAddClick={openNew} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Dashboard
              expenses={thisMonthExpenses}
            />
            <div className="mt-6">
              <ExpenseTable
                expenses={expenses}
                onEdit={openEdit}
                onDelete={deleteExpense}
              />
            </div>
          </div>
          <aside>
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-soft p-4 card-hover">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Quick Actions</h3>
                <button onClick={openNew} className="text-indigo-600 dark:text-indigo-300 font-semibold">
                  + New
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
                Add a new expense or edit existing ones from the transactions table.
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-soft p-4 card-hover">
                <h4 className="font-medium">Tips</h4>
                <ul className="mt-2 text-sm text-slate-500 dark:text-slate-300 space-y-1">
                  <li>- Click a row to edit a transaction.</li>
                  <li>- Use the search/filter inputs to find expenses.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <ExpenseForm
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        onSave={(e, id) => {
          if (id) updateExpense(id, e)
          else addExpense(e as Omit<Expense,'id'>)
          setFormOpen(false)
        }}
        editing={editing}
        onDelete={(id) => { deleteExpense(id); setFormOpen(false) }}
      />
    </div>
  )
}

export default App
