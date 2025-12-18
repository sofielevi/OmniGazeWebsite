# OmniGaze Website Context

This document provides essential context for the OmniGaze Website project, a modern Next.js 16 application serving as the public-facing platform for OmniGaze.

## Project Overview
OmniGaze is an **Applied Observability** platform that bridges the gap between IT operations (infrastructure) and enterprise architecture (strategy). The website handles marketing, user registration, subscription management (via Stripe), and the customer account portal.

### Core Concept: The Value Pyramid
The central differentiator for OmniGaze is the **Value Pyramid**, which connects five layers of business value:
1.  **Strategy** (Highest Value: 1-4 initiatives)
2.  **Value Streams** (10-20 value streams)
3.  **Business Capabilities** (100-200 capabilities)
4.  **Applications** (1,000-2,000 applications)
5.  **Infrastructure** (Foundation: 10,000+ assets)

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x (using the "Warm Technical" design system)
- **Icons:** Lucide React
- **Payments:** Stripe Checkout
- **Auth:** Email verification with HttpOnly cookies via OmniGaze API
- **Deployment:** Vercel (or Azure Static Web Apps)

## Building and Running
The following commands are available:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run typecheck`: Runs TypeScript compiler for type checking.

## Project Structure
- `src/app/`: App Router structure.
  - `(auth)/`: Authentication pages (Register, Login, Verify).
  - `(dashboard)/`: Customer account portal (Dashboard, Billing, Licenses, etc.).
  - `api/`: Backend API routes for Stripe webhooks/checkout and auth.
  - `marketing/`: Marketing pages (Landing, Pricing, Features, Download).
- `src/components/`:
  - `marketing/`: Components like `ValuePyramid`, `BridgeVisual`, `Hero`.
  - `ui/`: Base UI components (Buttons, Inputs).
  - `dashboard/`: Components specific to the account portal.
- `src/config/`: `site.ts` contains site metadata, navigation, and pricing/pyramid data.
- `src/lib/`: Utility functions and API clients (`api-client.ts`, `stripe.ts`).
- `work-chunks/`: Detailed implementation tracking and roadmap.

## Development Conventions
- **Design Aesthetic:** "Warm Technical" — dark theme (`#0d0f12`), amber accents (`#e8a030`), professional but approachable.
- **Typography:** 
  - Display: `Source Serif 4`
  - Body/Mono: `JetBrains Mono`
- **SEO:** Marketing pages must be optimized for search engines. Use `siteConfig` from `src/config/site.ts` for metadata.
- **API Integration:** Consumes the OmniGaze API at `api.omnigaze.com`. Do not access databases directly.
- **Pyramid Colors:** Maintain consistent coloring for the pyramid layers as defined in `src/config/site.ts`.
- **Navigation:** Use the custom `ButtonLink` component for consistent button styling in links.

## Key Files
- `src/config/site.ts`: Central source of truth for site configuration and data.
- `CLAUDE.md`: Contains technical rules and detailed project references.
- `work-chunks/00-MASTER-TRACKER.md`: Current implementation status and roadmap.
