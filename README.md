# Expense Tracker

A personal finance dashboard for tracking daily spending, visualizing trends, and staying on top of monthly budgets — built with React, TypeScript, and Tailwind CSS.

🔗 **Live demo:** https://prathimasunkara.github.io

## Overview

Minimal, fast expense tracker that turns raw transaction data into clear visual insights — monthly spend trends, category breakdowns, and quick summary stats — without needing a backend or account setup.

## Features

- **Add / edit / delete expenses** — capture category, amount, date, and notes
- **Dashboard summary cards** — total spend this month, top category, average daily spend
- **Monthly spending trend** — line chart tracking spend over time
- **Category breakdown** — donut chart visualizing spend by category (Food, Rent, Utilities, Transport, Entertainment)
- **Searchable & filterable transactions table** — filter by date range, search by amount/notes/category
- **Dark mode toggle** — full responsive light/dark theme
- **Persistent storage** — data saved locally via `localStorage`, seeded with sample data on first load

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Utilities:** clsx, uuid

## Getting Started

```bash
npm install
npm run dev
