# OmniGaze Website Project

## Project Overview
Public website for OmniGaze at **omnigaze.com** - marketing, registration, purchase, and customer account portal.

## Related Projects & Codebase References

| Project | Location | Purpose | Key Files |
|---------|----------|---------|-----------|
| **OmniGaze Core** | `F:\RootContext\OmniGazeRoot` | Main OmniGaze desktop application | Client code, feature handlers |
| **Self-Service Infrastructure** | `F:\RootContext\OmniGazeSelfService` | Database, API, Portal (internal) | SQL scripts, API controllers, Portal UI |
| **This Project** | `F:\RootContext\OmniGazeWebsite` | Public website (omnigaze.com) | Next.js app |

### Key Reference Files

| File | Location | Purpose |
|------|----------|---------|
| `landing-page.html` | `OmniGazeSelfService/` | Design reference (Warm Technical aesthetic) |
| `PRICING-TIERS.md` | `OmniGazeSelfService/` | Pricing strategy & competitor analysis |
| `OMNIGAZE-SELFSERVICE-SPEC.md` | `OmniGazeSelfService/` | Technical specification |
| `database-scripts/` | `OmniGazeSelfService/` | SQL schema for tiers, features |
| `work-chunks/` | `OmniGazeSelfService/` | Self-service implementation tasks |

---

## OmniGaze Value Proposition: The Pyramid

**CRITICAL: This pyramid is the core differentiator and MUST be prominently featured on marketing pages.**

```
                    +---------------------------+
                    |         STRATEGY          |  <- Highest Business Value
                    |      1-4 initiatives      |
                    +-------------+-------------+
                                  | 5:1 ratio
                    +-------------v-------------+
                    |       VALUE STREAMS       |
                    |    10-20 value streams    |
                    +-------------+-------------+
                                  | 20:1 ratio
          +-----------------------v-----------------------+
          |            BUSINESS CAPABILITIES              |
          |            100-200 capabilities               |
          +-----------------------+-----------------------+
                                  | 5:1 ratio
    +-----------------------------v-----------------------------+
    |                      APPLICATIONS                         |
    |                 1000-2000 applications                    |
    +-----------------------------+-----------------------------+
                                  | 10:1 ratio
+---------------------------------------------------------------+
|                       INFRASTRUCTURE                           |  <- Highest Complexity
|                        10,000+ assets                          |
+---------------------------------------------------------------+
```

### Pyramid Layer Details

| Layer | Count | Ratio | Value | OmniGaze Feature |
|-------|-------|-------|-------|------------------|
| **Strategy** | 1-4 | - | Highest | AI Insights, Executive Dashboards |
| **Value Streams** | 10-20 | 5:1 | High | Value Stream Mapping |
| **Business Capabilities** | 100-200 | 20:1 | Medium-High | FactSheets, Capability Mapping |
| **Applications** | 1,000-2,000 | 5:1 | Medium | Application Portfolio, Dependencies |
| **Infrastructure** | 10,000+ | 10:1 | Foundation | Auto-Discovery, CMDB, 3D Visualization |

### Key Marketing Messages

1. **"From Servers to Strategy"** - OmniGaze connects infrastructure discovery to business value
2. **"The Bridge"** - Unique position between IT operations tools and EA platforms
3. **"Applied Observability"** - Not just monitoring, but actionable business intelligence
4. **"See the Bigger Picture"** - Infrastructure → Applications → Capabilities → Strategy

### Competitive Positioning

```
INFRASTRUCTURE TOOLS                    ENTERPRISE ARCHITECTURE
(Faddom, Device42, Lansweeper)         (LeanIX, Ardoq, ServiceNow)
        |                                        |
        |            +-------------+             |
        +----------->|  OMNIGAZE   |<------------+
                     | THE BRIDGE  |
                     +-------------+

OmniGaze uniquely spans the FULL pyramid -
from infrastructure discovery to strategic planning
```

---

## System Architecture

```
+------------------------------------------------------------------------------+
|                          OMNIGAZE ECOSYSTEM                                   |
+------------------------------------------------------------------------------+
|  +-------------------+   +-------------------+   +-------------------------+  |
|  | OMNIGAZE WEBSITE  |   | OMNIGAZE CLIENT   |   |        PORTAL           |  |
|  | (omnigaze.com)    |   | (Desktop App)     |   | (portal.omnigaze.com)   |  |
|  | THIS PROJECT      |   | OmniGazeRoot      |   | Internal + Partners     |  |
|  +--------+----------+   +--------+----------+   +------------+------------+  |
|           |                       |                           |               |
|           v                       v                           v               |
|  +--------------------------------------------+   +-----------------------+   |
|  |       OMNIGAZE API (api.omnigaze.com)      |   |    PORTAL BACKEND     |   |
|  |       (Built in Self-Service project)      |   |   (Blazor Server)     |   |
|  +--------------------+-----------------------+   +-----------+-----------+   |
|                       |                                       |               |
|                       +-------------------+-------------------+               |
|                                           v                                   |
|                         +-----------------------------+                       |
|                         |     SHARED DATABASE         |                       |
|                         |   (omnigaze_com_db_core)    |                       |
|                         +-----------------------------+                       |
+------------------------------------------------------------------------------+
```

---

## Tech Stack (Implemented)

| Layer | Technology | Version | Status |
|-------|------------|---------|--------|
| **Framework** | Next.js (App Router) | 16.x | Installed |
| **Language** | TypeScript | 5.x | Installed |
| **Styling** | Tailwind CSS | 4.x | Installed |
| **UI Components** | Custom + Lucide icons | latest | Installed |
| **Auth** | HttpOnly cookies via API | - | API Ready |
| **Payments** | Stripe Checkout | latest | Not Started |
| **Hosting** | Static Export (Web Hotel) | - | Configured |
| **AI Image Gen** | MCP Integration | - | Pending MCP |
| **AI Video Gen** | MCP Integration (8sec 720p/1080p) | - | Pending MCP |

---

## Project Structure

```
omnigaze-website/
+-- src/
|   +-- app/                    # Next.js App Router
|   |   +-- (marketing)/        # Marketing pages (static)
|   |   |   +-- page.tsx        # Landing page
|   |   |   +-- pricing/
|   |   |   +-- features/
|   |   |   +-- download/
|   |   +-- (auth)/             # Auth pages
|   |   |   +-- login/
|   |   |   +-- register/
|   |   |   +-- verify/
|   |   +-- (dashboard)/        # Account portal (protected)
|   |   |   +-- dashboard/
|   |   |   +-- subscription/
|   |   |   +-- billing/
|   |   |   +-- licenses/
|   |   |   +-- team/
|   |   +-- api/                # API routes
|   |       +-- auth/
|   |       +-- stripe/
|   +-- components/
|   |   +-- ui/                 # shadcn/ui components
|   |   +-- marketing/          # Marketing-specific
|   |   |   +-- pyramid.tsx     # VALUE PYRAMID COMPONENT (critical)
|   |   |   +-- bridge.tsx      # Bridge positioning visual
|   |   +-- dashboard/          # Dashboard-specific
|   +-- lib/
|   |   +-- api-client.ts       # OmniGaze API client
|   |   +-- stripe.ts           # Stripe utilities
|   |   +-- auth.ts             # Auth configuration
|   +-- styles/
|       +-- globals.css
+-- public/
|   +-- images/
|       +-- pyramid.svg         # Pyramid graphic
|       +-- og-image.png        # Social sharing image
+-- next.config.js
+-- tailwind.config.ts
+-- package.json
```

---

## Page Architecture

### Marketing Pages (Static - SSG)
| Page | Route | Purpose | Key Visuals |
|------|-------|---------|-------------|
| Landing | `/` | Hero, value prop, CTA | **Pyramid**, Bridge diagram |
| Pricing | `/pricing` | Tier comparison, feature matrix | Tier cards |
| Features | `/features` | Detailed feature descriptions | **Pyramid layers**, screenshots |
| Download | `/download` | Installer download, system requirements | - |
| Docs | `/docs` | Getting started, documentation | - |

### Auth Pages
| Page | Route | Purpose |
|------|-------|---------|
| Register | `/register` | Email entry, tier selection |
| Verify | `/verify` | Verification code entry |
| Login | `/login` | Existing user login |
| Forgot Password | `/forgot-password` | Password reset flow |

### Account Portal (Protected - SSR)
| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/dashboard` | Overview, quick stats |
| Subscription | `/subscription` | Current tier, upgrade options |
| Billing | `/billing` | Payment history, invoices |
| Licenses | `/licenses` | License keys, activations |
| Team | `/team` | Team management (Business+) |
| Settings | `/settings` | Profile, preferences |

---

## API Integration

### OmniGaze API Endpoints (api.omnigaze.com)

**Desktop Client Endpoints (require OmniToken + OmniLicense headers):**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/Registration/Register` | POST | Email + machine registration |
| `/api/Registration/Verify` | POST | Verify email code |
| `/api/Registration/Resend` | POST | Resend verification code |
| `/api/Tier/All` | GET | Get all active tiers |
| `/api/Tier/Current` | GET | Get customer's tier + usage |
| `/api/Customer/Upgrade` | POST | Process tier upgrade |
| `/api/License/Heartbeat` | POST | Sync tier, features, limits |

**Website Endpoints (CORS protected, no OmniToken required):**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/website/health` | GET | Health check |
| `/api/website/tiers` | GET | Get all active tiers (public) |
| `/api/website/check-email` | GET | Check if email registered |
| `/api/website/register` | POST | Register new user |
| `/api/website/verify` | POST | Verify code, set HttpOnly cookie |
| `/api/website/resend` | POST | Resend verification code |
| `/api/website/login` | POST | Login with license key |
| `/api/website/logout` | POST | Clear session cookie |
| `/api/website/me` | GET | Get current user info (auth required) |
| `/api/website/tier` | GET | Get current tier + upgrades (auth required) |
| `/api/website/license-key` | GET | Get license key for desktop client |

### Stripe Integration
| Flow | Implementation |
|------|----------------|
| **Checkout** | Stripe Checkout (hosted) |
| **Webhooks** | `/api/stripe/webhook` route handler |
| **Portal** | Stripe Customer Portal for billing |
| **Subscriptions** | Managed via Stripe Billing |

---

## Design System

### Brand Guidelines
- **Aesthetic:** "Warm Technical" - professional but approachable
- **Theme:** Dark with amber accents
- **Typography:** Source Serif 4 (display), JetBrains Mono (body)
- **Tagline:** "Applied Observability"

### Color Palette
```css
/* Background */
--bg-deep: #0d0f12;
--bg-card: #14171c;
--bg-elevated: #1a1e25;

/* Text */
--text-primary: #f0ede8;
--text-secondary: #9a958d;

/* Brand - Amber */
--amber-400: #e8a030;
--amber-500: #d4841c;

/* Accent */
--success: #4ade80;

/* Pyramid Layer Colors (from image) */
--pyramid-strategy: #7c6aef;      /* Purple - top */
--pyramid-value-streams: #8b7cf5;
--pyramid-capabilities: #9d91f8;
--pyramid-applications: #b0a6fb;
--pyramid-infrastructure: #1e3a8a; /* Blue - bottom */
```

### Reference Design
See `F:\RootContext\OmniGazeSelfService\landing-page.html` for design reference.

---

## Pricing Tiers

| Tier | Price | Servers | Users | Pyramid Layers |
|------|-------|---------|-------|----------------|
| Community | Free | 50 | 1 | Infrastructure only |
| Starter | $99/mo | 200 | 3 | Infrastructure + Applications |
| Professional | $349/mo | 1,000 | 10 | + Business Capabilities |
| Business | $799/mo | 5,000 | 25 | + Value Streams |
| Enterprise | Contact | Unlimited | Unlimited | Full Pyramid + Strategy |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `work-chunks/00-MASTER-TRACKER.md` | Implementation progress |
| `work-chunks/WEB-01-INFRASTRUCTURE.md` | Project setup tasks |
| `work-chunks/WEB-02-MARKETING-PAGES.md` | Marketing page tasks |
| `work-chunks/WEB-03-REGISTRATION.md` | Registration flow tasks |
| `work-chunks/WEB-04-PURCHASE-FLOW.md` | Stripe integration tasks |
| `work-chunks/WEB-05-ACCOUNT-PORTAL.md` | Dashboard tasks |
| `work-chunks/WEB-06-DOWNLOAD-DOCS.md` | Download/docs tasks |
| `work-chunks/WEB-07-TESTING-LAUNCH.md` | Testing/launch tasks |

---

## Work Chunks Status

| # | Work Chunk | Status |
|---|------------|--------|
| WEB-01 | Infrastructure | **Complete** - Next.js 16, Tailwind 4, TypeScript |
| WEB-02 | Marketing Pages | **Complete** - Pages + AI visual assets (7 images, 1 video) |
| WEB-03 | Registration Flow | **UI Complete** - Register, Verify, Login, Success pages |
| WEB-04 | Purchase Flow | Not Started |
| WEB-05 | Account Portal | Not Started |
| WEB-06 | Download & Docs | **MVP Complete** - Docs page with quick start |
| WEB-07 | Testing & Launch | Not Started |

---

## Prerequisites (from Self-Service Project)

Before starting Website development:
- [ ] OmniGaze API tier endpoints complete (02-PORTAL-API)
- [ ] Email verification working (06-EMAIL-VERIFICATION)
- [ ] Payment integration ready (07-PAYMENT-INTEGRATION)

---

## Critical Rules for AI

1. **SEPARATE PROJECT** - This is the public website, NOT the internal Portal
2. **CONSUMES API** - Calls OmniGaze API (api.omnigaze.com), does not access DB directly
3. **SEO CRITICAL** - Marketing pages MUST be statically generated
4. **STRIPE CHECKOUT** - Use hosted Stripe Checkout, NOT custom payment forms
5. **AUTH** - Use NextAuth.js with email verification via OmniGaze API
6. **DESIGN MATCH** - Follow "Warm Technical" aesthetic from landing-page.html
7. **NO DOWNGRADE** - Upgrade only, matches self-service infrastructure rules
8. **EMAIL REQUIRED** - All tiers including Community require verified email
9. **PYRAMID IS KEY** - The value pyramid MUST be prominently featured on landing and features pages
10. **REFERENCE CODEBASES** - Check OmniGazeRoot for client features, OmniGazeSelfService for API/schema

---

## Environment Variables

```env
# Next.js
NEXT_PUBLIC_APP_URL=https://omnigaze.com

# OmniGaze API
OMNIGAZE_API_URL=https://api.omnigaze.com
OMNIGAZE_API_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# NextAuth
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://omnigaze.com
```

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Build static export (for FTP deployment)
npm run build:static

# Production
npm run start

# Lint
npm run lint

# Type check
npm run typecheck
```
