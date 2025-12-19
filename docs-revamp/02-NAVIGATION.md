# 02 - Navigation & Layout

## Objective
Create the docs sidebar navigation with tier indicators.

---

## Tasks

### Sidebar Navigation
- [x] Define navigation structure in `docs/layout.tsx`
- [x] Group pages by section:
  - [x] Getting Started
  - [x] Infrastructure
  - [x] Security & Credentials
  - [x] Applications (Starter+)
  - [x] Capabilities (Pro+)
  - [x] Advanced (Pro+)
  - [x] API Reference (Pro+)
- [x] Add icons for each section (use Lucide)
- [x] Show lock icon for tier-gated sections

### Active State
- [x] Highlight current page in sidebar
- [x] Use `usePathname()` to detect active route
- [x] Style: amber color for active item

### Tier Badges
- [x] Show tier badge next to locked items (e.g., "Pro+")
- [x] Dim/gray out items user can't access
- [x] Still show items (don't hide) - encourages upgrade

### Mobile Navigation
- [x] Hamburger menu for mobile (top-left button)
- [x] Slide-out sidebar (w-72, transitions)
- [x] Close on navigation (useEffect on pathname)
- [x] Overlay backdrop when open

### Breadcrumbs
- [x] Show path: Docs > Section > Page
- [x] Clickable navigation
- [x] Auto-generated from navSections config

---

## Navigation Structure

```
Getting Started           ✓
  ├─ Overview             ✓
  ├─ Installation         ✓
  ├─ Activation           ✓
  └─ First Scan           ✓

Infrastructure            ✓
  ├─ Asset Discovery      ✓
  ├─ Network Scanning     ✓
  ├─ Server Details       ✓
  └─ 3D Visualization     ✓

Security & Credentials    ✓
  ├─ Overview             ✓
  ├─ Route to Least Privilege ✓
  ├─ WinRM Setup          ✓
  └─ Troubleshooting      ✓

Applications [Starter+]   ✓
  ├─ App Discovery        ✓
  └─ App Mapping          ✓

Capabilities [Pro+]       ✓
  ├─ Business Capabilities ✓
  └─ Capability Mapping   ✓

Advanced [Pro+]           ✓
  ├─ Architecture Mapping ✓
  └─ Value Streams        ✓

API Reference [Pro+]      ✓
  ├─ REST API             ✓
  └─ OData Endpoints      ✓
```

---

## Verification
- [x] Sidebar renders all sections
- [x] Active page highlighted (amber)
- [x] Lock icons show for tier-gated content
- [x] Mobile menu opens/closes
- [x] Navigation links work
- [x] Breadcrumbs show on sub-pages
- [x] Build succeeds

---

## Files Modified
| File | Changes |
|------|---------|
| `src/app/(dashboard)/docs/layout.tsx` | Added mobile nav, breadcrumbs |

---

## Features Implemented
- **Mobile navigation**: Hamburger button at top-left, slide-out sidebar
- **Breadcrumbs**: Auto-generated from navigation config
- **Tier badges**: Shows "Starter+", "Pro+", "Business+" for locked content
- **Lock icons**: Visual indicator for inaccessible content
- **Active highlighting**: Amber background for current page
