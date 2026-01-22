# WEB-02: Marketing Pages

**Priority:** P1 (High)
**Estimated Hours:** 16h
**Status:** **COMPLETE**
**Owner:** Claude
**Due Date:** 2024-12-18
**Depends On:** WEB-01 (Infrastructure)

---

## Objective

Build all public-facing marketing pages with static generation for optimal SEO. Design must match the "Warm Technical" aesthetic from the landing page draft.

**CRITICAL: The Value Pyramid must be prominently featured on landing and features pages.**

---

## Prerequisites

- [x] WEB-01-INFRASTRUCTURE complete
- [x] Design assets available (screenshots, logos, pyramid graphic) - AI-generated
- [x] Copy/content finalized

---

## Reference Design

See `F:\RootContext\OmniGazeSelfService\landing-page.html` for:
- Color palette
- Typography
- Component styles
- Animation patterns

---

## The Value Pyramid - Core Differentiator

**This visual is the #1 marketing asset and must be implemented as a reusable, animated component.**

```
                    +---------------------------+
                    |         STRATEGY          |  <- Highest Business Value
                    |      1-4 initiatives      |     (Purple: #7c6aef)
                    +-------------+-------------+
                                  | 5:1 ratio
                    +-------------v-------------+
                    |       VALUE STREAMS       |     (#8b7cf5)
                    |    10-20 value streams    |
                    +-------------+-------------+
                                  | 20:1 ratio
          +-----------------------v-----------------------+
          |            BUSINESS CAPABILITIES              |  (#9d91f8)
          |            100-200 capabilities               |
          +-----------------------+-----------------------+
                                  | 5:1 ratio
    +-----------------------------v-----------------------------+
    |                      APPLICATIONS                         |  (#b0a6fb)
    |                 1000-2000 applications                    |
    +-----------------------------+-----------------------------+
                                  | 10:1 ratio
+---------------------------------------------------------------+
|                       INFRASTRUCTURE                           |  <- Highest Complexity
|                        10,000+ assets                          |     (Blue: #1e3a8a)
+---------------------------------------------------------------+

Left axis: "Business Value" (Highest at top)
Right axis: "Strategic Focus"
Left bottom: "Complexity" (Highest at bottom)
```

### Pyramid Layer Data

| Layer | Count | Ratio | Color | OmniGaze Features |
|-------|-------|-------|-------|-------------------|
| Strategy | 1-4 initiatives | - | `#7c6aef` | AI Insights, Executive Dashboards |
| Value Streams | 10-20 | 5:1 | `#8b7cf5` | Value Stream Mapping |
| Business Capabilities | 100-200 | 20:1 | `#9d91f8` | FactSheets, Capability Mapping |
| Applications | 1,000-2,000 | 5:1 | `#b0a6fb` | Application Portfolio |
| Infrastructure | 10,000+ | 10:1 | `#1e3a8a` | Auto-Discovery, CMDB, 3D |

### Pyramid Component Requirements

- [ ] **Interactive hover states** - Highlight layer on hover, show details
- [ ] **Animated reveal** - Layers animate in from bottom to top on scroll
- [ ] **Responsive** - Scales properly on mobile
- [ ] **Labels** - Business Value axis (left), Strategic Focus (right), Complexity (bottom-left)
- [ ] **Ratios** - Display ratios between layers
- [ ] **Click to expand** - Optional: click layer to see features included

---

## Tasks

### 1. Shared Components

- [ ] **Header/Navigation**
  - Logo with "OG" mark
  - Navigation links (Features, Pricing, Docs)
  - CTA button ("Get Started Free")
  - Mobile hamburger menu
  - Sticky on scroll with blur backdrop

- [ ] **Footer**
  - Footer links (Documentation, API Reference, Support, Privacy, Terms)
  - Copyright notice
  - Social links (optional)

- [ ] **Section Components**
  - SectionHeader (label, title, description)
  - Container with max-width

- [ ] **Button Variants**
  - Primary (amber gradient)
  - Secondary (elevated background)
  - Ghost

### 2. VALUE PYRAMID COMPONENT (Critical)

**File:** `src/components/marketing/value-pyramid.tsx`

- [ ] **SVG-based pyramid graphic**
  - 5 layers with distinct colors (purple gradient to blue)
  - Proper proportions matching the image
  - Labels for each layer (name + count)

- [ ] **Axis Labels**
  - Left side: "Business Value - Highest" (top)
  - Left side: "Complexity - Highest" (bottom)
  - Right side: "Strategic Focus" (top)

- [ ] **Ratio Connectors**
  - Lines between layers showing ratios (5:1, 20:1, 5:1, 10:1)

- [ ] **Animations**
  - Scroll-triggered reveal (bottom to top)
  - Hover state per layer
  - Optional: pulse animation on featured layer

- [ ] **Interactive States**
  - Hover: highlight layer, show tooltip with features
  - Click: expand to show detailed features for that layer (optional)

- [ ] **Responsive Behavior**
  - Desktop: Full horizontal pyramid
  - Tablet: Slightly scaled
  - Mobile: Vertical stack OR smaller pyramid with modal for details

### 3. Landing Page (`/`)

- [ ] **Hero Section**
  - Badge ("Now with 3D Architecture Visualization")
  - Headline: "See Your Infrastructure Clearly" with gradient text
  - Subtitle: Connect infrastructure to business value
  - CTA buttons (Start Free, Watch Demo)
  - Stats row (60min Setup, 50+ Free Servers, Zero Agents)

- [ ] **Background Effects**
  - Grid pattern with fade mask
  - Glow orbs (animated)
  - Network nodes animation (optional)

- [ ] **VALUE PYRAMID SECTION** (PROMINENT - above fold or immediately after hero)
  - Section title: "From Servers to Strategy"
  - Subtitle: "The only platform that spans the full value chain"
  - Full pyramid component with all 5 layers
  - Brief description of each layer
  - CTA: "See All Features" / "Start Free"

- [ ] **Bridge Visual Section**
  - "One Platform, Complete Visibility"
  - Visual showing: Infrastructure Tools <-> OmniGaze <-> EA Tools
  - Tool logos/names (Faddom, Device42 | OmniGaze | LeanIX, ServiceNow)
  - Key message: OmniGaze bridges both worlds

- [ ] **Features Preview Section**
  - Feature cards with icons organized by pyramid layer
  - Brief descriptions
  - Link to full features page

- [ ] **Social Proof Section** (if available)
  - Customer logos
  - Testimonials
  - Case study snippets

- [ ] **CTA Section**
  - "Ready to See Everything?"
  - Final call-to-action box

### 4. Pricing Page (`/pricing`)

- [ ] **Pricing Toggle**
  - Monthly / Annual switch
  - "Save 17%" badge on annual

- [ ] **Pricing Cards**
  - 5 tier cards (Community, Starter, Professional, Business, Enterprise)
  - "Most Popular" badge on Professional
  - Price display (updates on toggle)
  - Server/User limits
  - **Pyramid layer indicator** (which layers each tier unlocks)
  - Feature list with checkmarks
  - CTA button per tier

- [ ] **Pyramid-to-Tier Mapping Visual**
  - Show which tiers unlock which pyramid layers
  - Community: Infrastructure only
  - Starter: Infrastructure + Applications
  - Professional: + Business Capabilities
  - Business: + Value Streams
  - Enterprise: Full Pyramid + Strategy

- [ ] **Feature Comparison Matrix**
  - Full feature table
  - Category headers organized by pyramid layer
  - Check/dash marks per tier

- [ ] **FAQ Section**
  - Common pricing questions
  - Accordion/collapsible format

### 5. Features Page (`/features`)

- [ ] **Hero Section**
  - "Everything You Need" headline
  - Subtitle: "From infrastructure discovery to strategic planning"

- [ ] **INTERACTIVE PYRAMID SECTION**
  - Full pyramid with clickable layers
  - Click layer -> scrolls to that section
  - OR: Click layer -> expands inline with features

- [ ] **Feature Sections by Pyramid Layer**

  **Infrastructure Layer** (Blue)
  - Network scanning & auto-discovery
  - Asset inventory (Windows, Linux, network devices)
  - 2D & 3D visualization
  - CMDB management
  - Tag management

  **Applications Layer** (Light purple)
  - Process discovery & mapping
  - Application dependencies
  - Connection analysis
  - Software inventory
  - Scheduled scans

  **Business Capabilities Layer** (Medium purple)
  - FactSheets
  - Business capability mapping
  - OData API access
  - AD/LDAP integration
  - CSV export

  **Value Streams Layer** (Purple)
  - Value stream mapping
  - Azure cloud discovery
  - Intune integration
  - CIS compliance
  - SSO (Azure AD/Entra ID)

  **Strategy Layer** (Dark purple)
  - AI-powered insights
  - Executive dashboards
  - LeanIX integration
  - ServiceNow sync
  - Custom reporting

- [ ] **Feature Detail Cards**
  - Icon
  - Title
  - Description
  - Tier badge (which tier includes it)
  - Pyramid layer indicator
  - Screenshot/illustration (if available)

- [ ] **Security & Compliance Section**
  - Vulnerability scanning
  - SSL certificate tracking
  - CIS benchmarks
  - Compliance reporting

- [ ] **Integration Section**
  - List of integrations
  - API documentation link

- [ ] **CTA Section**
  - Link to pricing
  - Start free trial

### 6. About Page (`/about`) - Optional

- [ ] Company story
- [ ] Team (if public)
- [ ] Values/mission

### 7. Contact Page (`/contact`)

- [ ] Contact form
- [ ] Email address
- [ ] Support links

---

## SEO Requirements

### Meta Tags (per page)

```typescript
// Example for landing page
export const metadata: Metadata = {
  title: 'OmniGaze - See Your Infrastructure Clearly | Applied Observability',
  description: 'Auto-discover your servers, map dependencies, and bridge IT operations with enterprise architecture. From infrastructure to strategy.',
  keywords: ['infrastructure discovery', 'CMDB', 'enterprise architecture', 'IT visualization', 'business capabilities', 'value stream mapping'],
  openGraph: {
    title: 'OmniGaze - From Servers to Strategy',
    description: 'The only platform that connects infrastructure discovery to strategic business value.',
    url: 'https://omnigaze.com',
    siteName: 'OmniGaze',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniGaze - Applied Observability',
    description: 'From 10,000+ infrastructure assets to 1-4 strategic initiatives.',
  },
};
```

### Structured Data

- [ ] Organization schema
- [ ] Product schema (for pricing)
- [ ] FAQ schema (for pricing FAQ)

### Technical SEO

- [ ] Sitemap generation (`next-sitemap`)
- [ ] robots.txt
- [ ] Canonical URLs
- [ ] Alt text for all images

---

## Responsive Breakpoints

| Breakpoint | Width | Pyramid Behavior |
|------------|-------|------------------|
| Mobile | < 768px | Vertical stack or simplified |
| Tablet | 768-1024px | Scaled pyramid |
| Desktop | > 1024px | Full pyramid with all details |

---

## Animation Guidelines

- Use CSS animations (not heavy JS)
- Intersection Observer for scroll reveals
- **Pyramid animations:**
  - Layers reveal bottom-to-top on scroll
  - Hover: layer grows slightly, shows glow
  - Transition duration: 0.3s ease-out-expo
- Respect `prefers-reduced-motion`

---

## Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `src/components/marketing/value-pyramid.tsx` | **Pyramid component** | **CRITICAL** |
| `src/components/marketing/pyramid-layer.tsx` | Individual layer component | High |
| `src/components/marketing/bridge-visual.tsx` | Bridge positioning diagram | High |
| `src/app/(marketing)/page.tsx` | Landing page | High |
| `src/app/(marketing)/pricing/page.tsx` | Pricing page | High |
| `src/app/(marketing)/features/page.tsx` | Features page | High |
| `src/app/(marketing)/contact/page.tsx` | Contact page | Medium |
| `src/app/(marketing)/layout.tsx` | Marketing layout | High |
| `src/components/marketing/header.tsx` | Navigation header | High |
| `src/components/marketing/footer.tsx` | Footer | High |
| `src/components/marketing/pricing-card.tsx` | Pricing card component | High |
| `src/components/marketing/feature-card.tsx` | Feature card component | High |
| `src/components/marketing/hero.tsx` | Hero section | High |
| `src/components/marketing/section.tsx` | Section wrapper | High |

---

## Content Required

- [ ] Hero headline and subtitle copy
- [ ] Pyramid layer descriptions (short + detailed)
- [ ] Feature descriptions for each pyramid layer
- [ ] Pricing FAQ questions and answers
- [ ] Screenshots/images of OmniGaze
- [ ] Customer logos (if available)
- [ ] **Pyramid graphic assets** (SVG preferred)
- [ ] OG image for social sharing (should include pyramid)

---

## AI-Generated Media Assets (via MCP) - **COMPLETE**

### Image Generation - **COMPLETE**
All images generated using Google Imagen 4 Ultra via MCP integration:

- [x] **Hero background images** - `public/images/hero-network.png` (1.4MB)
- [x] **Feature illustrations** - Pyramid layer images for each layer
  - `public/images/layer-infrastructure.png` (1.7MB)
  - `public/images/layer-applications.png` (837KB)
  - `public/images/layer-capabilities.png` (1.1MB)
  - `public/images/layer-value-streams.png` (765KB)
  - `public/images/layer-strategy.png` (805KB)
- [x] **OG/Social images** - `public/images/og-image.png` (702KB)

### Video Generation - **COMPLETE**
Generated using Google Veo 3.1 via MCP integration:

- [x] **Hero video** - `public/videos/hero-animation.mp4` (7.3MB, 8sec, 720p)
  - Network nodes building from bottom to top
  - Pyramid structure visualization
  - Blue to purple gradient transition
  - Warm technical aesthetic

### Integration Status - **COMPLETE**
- [x] Hero component updated with background image + video modal
- [x] Features page updated with layer images
- [x] OG image referenced in layout metadata
- [x] "Watch Demo" button opens video modal
- [x] All images use Next.js Image component for optimization

---

## Verification Checklist

- [ ] **Pyramid component renders correctly on all breakpoints**
- [ ] **Pyramid animations work smoothly (60fps)**
- [ ] All pages render without errors
- [ ] Pages are statically generated (check build output)
- [ ] Mobile responsive on all breakpoints
- [ ] Lighthouse score > 90 (Performance, SEO, Accessibility)
- [ ] Meta tags render correctly
- [ ] Design matches landing-page.html reference

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] **Pyramid component prominently featured on landing and features pages**
- [ ] Pages reviewed for design accuracy
- [ ] SEO audit passed
- [ ] Accessibility audit passed (WCAG 2.1 AA)
