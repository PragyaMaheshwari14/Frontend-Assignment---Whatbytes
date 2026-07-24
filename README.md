# Whatbytes Frontend Assignment — E-commerce UI

A responsive e-commerce product listing, product detail, and cart app built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, styled in a **monochrome** theme.

**Live URL:** _(added after Vercel deployment)_

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- React Context for cart state
- localStorage for cart persistence
- lucide-react for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                 Routes (/, /product/[id], /cart)
components/          Reusable UI components
context/             React Context providers (cart state)
data/                Mock product data
lib/                 Helper/utility functions
types/               Shared TypeScript types
```

## Features

- Responsive product grid (3 / 2 / 1 columns)
- Category + price range filtering, brand filter
- Search with string matching
- URL-based filters (`?category=electronics&price=0-1000`)
- Dynamic product detail routing (`/product/[id]`)
- Cart with quantity controls, persisted to localStorage
- Conditional "no products found" state

## Progress

- [x] Part 1 — Project setup (Next.js, Tailwind, folder structure, mock data)
- [x] Part 2 — Header & Footer
- [ ] Part 3 — Product grid & product card
- [ ] Part 4 — Sidebar filters UI
- [ ] Part 5 — Filtering & search logic
- [ ] Part 6 — URL-based filters
- [ ] Part 7 — Cart state management (Context + localStorage)
- [ ] Part 8 — Product detail page
- [ ] Part 9 — Cart page
- [ ] Part 10 — Polish & Vercel deployment
