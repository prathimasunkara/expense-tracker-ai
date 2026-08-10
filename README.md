# Expense Tracker

Minimal React + TypeScript expense tracker with Tailwind CSS and Recharts.

Features:
- Add / edit / delete expenses (category, amount, date, notes)
- Dashboard with monthly spending line chart and category breakdown pie chart (Recharts)
- Summary cards row: total this month, top category, average daily spend
- Searchable/filterable transactions table
- Dark mode toggle
- Responsive layout with micro-animations
- LocalStorage persistence with seeded sample data on first load

Get started:

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

Notes:
- Data is stored in localStorage under the `expenses_v1` key. Clear that key to reset sample data.
- The UI uses Tailwind's `class` dark mode. Use the toggle in the header.

License: MIT
