# 04 - Getting Started Pages

## Objective
Create the introductory documentation pages.

---

## Pages to Create

### 1. Overview (`/dashboard/docs`)
- [x] Create `src/app/(dashboard)/docs/page.tsx`
- [x] Welcome message
- [x] Quick links to key sections
- [x] "What is OmniGaze" summary
- [x] Link to first scan guide

### 2. Installation (`/dashboard/docs/getting-started/installation`)
- [x] Create folder and `page.tsx`
- [x] System requirements (Windows 10/11, Server 2016+)
- [x] Download link
- [x] Installation steps (StepList component)
- [x] Silent install options (CommandBlock)

### 3. Activation (`/dashboard/docs/getting-started/activation`)
- [x] Create folder and `page.tsx`
- [x] Where to find license key (Email, Dashboard)
- [x] How to enter in OmniGaze (StepList)
- [x] Activation troubleshooting
- [x] Command line activation
- [x] Offline activation note

### 4. First Scan (`/dashboard/docs/getting-started/first-scan`)
- [x] Create folder and `page.tsx`
- [x] What you'll discover (Servers, Applications, Dependencies)
- [x] Prerequisites (WinRM, credentials)
- [x] Quick credential setup (link to Security section)
- [x] Enter IP range / hostname
- [x] Click Scan - running steps
- [x] Quick Start: local machine scan
- [x] Understanding results (4 view types)
- [x] CLI scanning examples
- [x] What to do next

---

## Content Sources
| Page | Source |
|------|--------|
| Overview | New content |
| Installation | `OmniGazeRoot/Documentation/Guides/` |
| Activation | New content + existing flow |
| First Scan | `OmniGazeRoot/Documentation/Guides/OmniGaze_Navigation_Guide.md` |

---

## Folder Structure
```
src/app/(dashboard)/docs/
├── page.tsx                          # Overview ✓
└── getting-started/
    ├── installation/
    │   └── page.tsx                  # ✓
    ├── activation/
    │   └── page.tsx                  # ✓
    └── first-scan/
        └── page.tsx                  # ✓
```

---

## Verification
- [x] All 4 pages accessible
- [x] Links between pages work
- [x] Download link on Installation page works
- [x] Build succeeds
- [x] Uses doc components (CommandBlock, Callout, StepList)

---

## Files Created

| File | Purpose |
|------|---------|
| `src/app/(dashboard)/docs/getting-started/installation/page.tsx` | Installation guide |
| `src/app/(dashboard)/docs/getting-started/activation/page.tsx` | License activation |
| `src/app/(dashboard)/docs/getting-started/first-scan/page.tsx` | First scan tutorial |

