export type Category =
  | 'Food'
  | 'Rent'
  | 'Utilities'
  | 'Entertainment'
  | 'Transport'
  | 'Other'

export interface Expense {
  id: string
  amount: number
  category: Category
  date: string // ISO date
  notes?: string
}
