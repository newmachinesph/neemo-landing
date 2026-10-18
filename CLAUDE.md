# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neemo is a personal finance app landing site and app prototype built for Filipino users. The app name is "Neemo" (previously referenced as "Fintr" or "Phinance" in some internal code). The product focuses on goal-based financial planning with a "when will I achieve X?" paradigm rather than traditional budgeting. The default currency is PHP (Philippine Peso).

## Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, core-web-vitals + typescript rules)

No test framework is currently configured.

## Tech Stack

- **Framework:** Next.js 16 with App Router, React 19, TypeScript 5.9
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`), with CSS custom properties in `globals.css`
- **State:** Zustand with `persist` middleware (localStorage)
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Icons:** Heroicons (`@heroicons/react`) and Lucide React
- **UI primitives:** Headless UI (`@headlessui/react`)
- **Utilities:** clsx (via `cn()` in `src/lib/utils.ts`), date-fns

## Architecture

### Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

### App Router Pages (`src/app/`)
Landing site pages: home (`page.tsx`), `/about`, `/features`, `/how-it-works`, `/faq`, `/contact`, `/privacy`, `/terms`. The root layout uses Inter font and wraps everything in `ThemeProvider`.

### State Management (`src/stores/`)
Zustand stores for each domain entity: `transaction-store`, `budget-store`, `goal-store`, `investment-store`, `loan-store`, `account-store`, `theme-store`. Stores are initialized with dummy data from `src/data/dummy-data.ts`. The theme store persists under the key `phinance-theme`.

### Type System (`src/types/index.ts`)
Single barrel file containing all domain types: accounts, transactions, budgets, goals, investments, loans, bills, paluwagan (Filipino rotating savings), remittances, 13th month pay, government contributions (SSS/Pag-IBIG/PhilHealth), multi-currency, and more.

### Component Organization (`src/components/`)
- **`ui/`** — Reusable primitives (Button, Card, Input, Modal, Tabs, Badge, Progress, etc.) exported via barrel `index.ts`
- **`layout/`** — App shell components (Navbar, Footer, Sidebar, Header, BottomNav, AppLayout) with v2 mobile-first variants
- **`landing/`** — Landing page components (Section, CTAButton, TrustBar, MobileMockups, SectionHeading)
- **`dashboard/`** — Dashboard widgets (NetWorthCard, BudgetSummary, SpendingChart, etc.)
- **`features/`** — Feature-specific components organized by domain: `filipino/`, `filipino-features/`, `smart/`, `smart-features/`, `social/`, `social-features/`, `gamification/`, `reports/`, `insights/`, `onboarding/`, `financial-tools/`, `quality-of-life/`, `dashboard/`
- **`social/`** — Social engagement components (ReactionButton, CheerButton, EncouragementCard)
- **`providers/`** — ThemeProvider (class-based dark mode on `<html>`)

### Styling Conventions
- Dark mode via `.dark` class on `<html>` element (not Tailwind's media strategy)
- Brand colors: maroon (`#9b1b3c`) and coral (`#f58560`) defined as CSS custom properties in `globals.css`
- Extensive CSS utility classes for animations (`animate-fade-in`, `hover-lift`, `btn-glow-coral`, `glass-card`, etc.) in `globals.css`
- Components use Tailwind classes with `dark:` variants, supplemented by custom CSS overrides in `globals.css`
- `cn()` helper from `src/lib/utils.ts` for conditional class merging (uses `clsx`)

### Utility Functions (`src/lib/utils.ts`)
`formatCurrency` (defaults to PHP), `formatDate`, `formatPercentage`, `calculatePercentage`, `generateId`, status/priority/risk color helpers, `getBudgetStatus`, date calculation helpers.
