# Neemo Landing

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

The marketing and landing site for Neemo — a personal finance app built specifically for Filipinos. Showcases all app features with interactive mockups, Filipino-specific financial tools, and a contact/FAQ section.

## Overview

Neemo is built around a "when will I achieve X?" goal-based financial planning paradigm rather than traditional budgeting. The landing site demonstrates the full feature set of the Neemo app, with Filipino-specific tools like a transpo calculator, utang (debt) manager, paluwagan tracking, and government contribution helpers (SSS, Pag-IBIG, PhilHealth). Default currency is PHP (Philippine Peso).

## Features Showcased

### Core Finance
- Dashboard overview with spending summaries
- Transaction tracking and budget management
- Savings goals and insights

### Filipino-Specific Features
- Transpo calculator (commute cost tracking)
- Utang manager (informal debt tracking)
- Paluwagan (rotating savings group) tracker
- 13th month pay calculator
- SSS / Pag-IBIG / PhilHealth contribution helpers

### Smart Features
- AI-powered spending insights
- Smart budget recommendations
- Automated categorization

### Social Features
- Split expenses with friends
- Group expense management

### Gamification
- Financial challenges and streaks
- Achievement badges

## Pages

- `/` — Main landing page with hero, features, and CTA
- `/features` — Detailed feature showcase
- `/how-it-works` — Step-by-step walkthrough
- `/about` — About Neemo
- `/contact` — Contact form
- `/faq` — Frequently asked questions
- `/privacy` and `/terms` — Legal pages
- `/admin` — Internal admin portal

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| State | Zustand (with localStorage persistence) |
| Charts | Recharts |
| Icons | Heroicons, Lucide React |
| Backend (admin/contact) | Neon Postgres (`@neondatabase/serverless`), bcryptjs |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Environment

The contact form, newsletter and admin portal need `DATABASE_URL` (Neon Postgres) and `SESSION_SECRET`. Create the tables with `npm run db:setup` and an admin user with `npm run db:seed -- <email> <password>`.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Main landing page
│   ├── features/
│   ├── how-it-works/
│   ├── about/
│   ├── contact/
│   ├── faq/
│   ├── admin/
│   └── ...
├── components/
│   ├── landing/             # Landing page sections
│   ├── features/            # Feature demo components
│   │   ├── filipino/
│   │   ├── filipino-features/
│   │   ├── financial-tools/
│   │   ├── gamification/
│   │   ├── social/
│   │   └── ...
│   ├── layout/              # Sidebar, nav, shell
│   └── ui/                  # Reusable UI components
├── data/                    # Dummy/demo data
├── stores/                  # Zustand state
├── types/                   # TypeScript types
└── lib/                     # Utilities (formatCurrency, formatDate, etc.)
```

## License

MIT — see [LICENSE](LICENSE).
