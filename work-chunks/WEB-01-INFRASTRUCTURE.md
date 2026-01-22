# WEB-01: Infrastructure

**Priority:** P0 (Critical Path)
**Estimated Hours:** 8h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________

---

## Objective

Set up the Next.js 14 project with all required tooling, configurations, and deployment infrastructure.

---

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] npm/pnpm installed
- [ ] Vercel account (or Azure subscription)
- [ ] GitHub repository created

---

## Tasks

### 1. Project Initialization

- [ ] Create Next.js 14 project with App Router
  ```bash
  npx create-next-app@latest omnigaze-website --typescript --tailwind --eslint --app --src-dir
  ```
- [ ] Configure TypeScript strict mode
- [ ] Set up path aliases (`@/components`, `@/lib`, etc.)

### 2. Dependencies Installation

- [ ] Install core dependencies:
  ```bash
  npm install @tanstack/react-query zod react-hook-form @hookform/resolvers
  npm install next-auth@beta @auth/core
  npm install stripe @stripe/stripe-js
  npm install lucide-react clsx tailwind-merge
  ```

- [ ] Install dev dependencies:
  ```bash
  npm install -D @types/node prettier prettier-plugin-tailwindcss
  ```

### 3. shadcn/ui Setup

- [ ] Initialize shadcn/ui:
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Configure with dark theme defaults
- [ ] Install base components:
  ```bash
  npx shadcn-ui@latest add button card input label
  npx shadcn-ui@latest add dialog dropdown-menu sheet
  npx shadcn-ui@latest add form toast tabs table
  ```

### 4. Tailwind Configuration

- [ ] Configure custom color palette (from landing-page.html):
  ```typescript
  // tailwind.config.ts
  colors: {
    background: {
      deep: '#0d0f12',
      card: '#14171c',
      elevated: '#1a1e25',
      hover: '#22272f',
    },
    foreground: {
      primary: '#f0ede8',
      secondary: '#9a958d',
      muted: '#5f5b54',
    },
    amber: {
      50: '#fef7e8',
      100: '#fdecc8',
      200: '#f9d68a',
      300: '#f4b94d',
      400: '#e8a030',
      500: '#d4841c',
      600: '#b86814',
    },
    success: '#4ade80',
  }
  ```
- [ ] Configure fonts (Source Serif 4, JetBrains Mono)
- [ ] Set up custom CSS variables

### 5. Project Structure

- [ ] Create folder structure:
  ```
  src/
  +-- app/
  |   +-- (marketing)/        # Public pages
  |   +-- (auth)/             # Auth pages
  |   +-- (dashboard)/        # Protected pages
  |   +-- api/                # API routes
  |   +-- layout.tsx
  |   +-- globals.css
  +-- components/
  |   +-- ui/                 # shadcn components
  |   +-- marketing/
  |   +-- dashboard/
  |   +-- shared/
  +-- lib/
  |   +-- utils.ts
  |   +-- api-client.ts
  |   +-- stripe.ts
  +-- types/
  |   +-- index.ts
  +-- hooks/
  +-- config/
      +-- site.ts
  ```

### 6. Environment Variables

- [ ] Create `.env.local` template:
  ```env
  # App
  NEXT_PUBLIC_APP_URL=http://localhost:3000

  # OmniGaze API
  OMNIGAZE_API_URL=https://api.omnigaze.com
  OMNIGAZE_API_KEY=

  # Stripe
  STRIPE_SECRET_KEY=sk_test_xxx
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
  STRIPE_WEBHOOK_SECRET=whsec_xxx

  # NextAuth
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=http://localhost:3000
  ```
- [ ] Create `.env.example` for documentation
- [ ] Add `.env.local` to `.gitignore`

### 7. API Client Setup

- [ ] Create OmniGaze API client (`src/lib/api-client.ts`):
  ```typescript
  const API_BASE = process.env.OMNIGAZE_API_URL;

  export const omnigazeApi = {
    registration: {
      register: (email: string, ...args) => fetch(...),
      verify: (email: string, code: string) => fetch(...),
      resend: (email: string) => fetch(...),
    },
    tiers: {
      getAll: () => fetch(...),
      getCurrent: (licenseKey: string) => fetch(...),
    },
    // ...
  };
  ```

### 8. Hosting Setup (Vercel)

- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up preview deployments for PRs
- [ ] Configure production domain (omnigaze.com)

### 9. CI/CD Pipeline

- [ ] Create GitHub Actions workflow (`.github/workflows/ci.yml`):
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm ci
        - run: npm run lint
        - run: npm run typecheck
        - run: npm run build
  ```

### 10. Development Tooling

- [ ] Configure ESLint (extend Next.js defaults)
- [ ] Configure Prettier
- [ ] Set up VS Code settings (`.vscode/settings.json`)
- [ ] Create npm scripts:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  }
  ```

---

## Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] shadcn/ui components render correctly
- [ ] Custom Tailwind colors work

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, providers |
| `src/app/globals.css` | Global styles, CSS variables |
| `src/lib/utils.ts` | Utility functions (cn helper) |
| `src/lib/api-client.ts` | OmniGaze API client |
| `src/config/site.ts` | Site configuration |
| `tailwind.config.ts` | Tailwind configuration |
| `.env.example` | Environment variable template |
| `.github/workflows/ci.yml` | CI pipeline |

---

## Notes

- Use App Router (not Pages Router)
- Prefer server components by default
- Use `'use client'` only when necessary
- Follow Next.js 14 conventions

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] Code compiles without errors
- [ ] Ready for WEB-02 development
