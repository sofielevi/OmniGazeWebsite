# OmniGaze Website Fix Plan

## Tasks

- [x] **1. Demo Player - Remove play button, autoplay video**
  - Removed modal-based video player
  - Embedded video directly in hero section with autoplay, muted, loop
  - File: `src/components/marketing/hero.tsx`

- [ ] **2. Email verification not working** (BACKEND ISSUE)
  - **Note:** This is an API/backend issue in OmniGazeSelfService, not a website issue
  - The website correctly calls `/api/website/register`
  - Email sending must be fixed in the API backend
  - **Action:** Needs investigation in `F:\RootContext\OmniGazeSelfService`

- [x] **3. Pyramid ratios - Add tooltip explanation**
  - Added hover tooltip to ratio labels explaining they are example data
  - Tooltip shows: "Example ratio: Typically X items at this level support Y item above"
  - File: `src/components/marketing/value-pyramid.tsx`

- [x] **4. Navigation blank screen**
  - **Root cause:** Next.js Link prefetch causes intermittent navigation failures
  - Created custom Link component with `prefetch={false}` default (`src/components/ui/link.tsx`)
  - Updated Header, Footer, Sidebar, Auth layout to use custom Link
  - Updated ButtonLink to use custom Link instead of plain `<a>` tag
  - Fixed contact page redirect: changed from `router.replace()` to server-side `redirect()`
  - Removed duplicate globals.css import from auth layout
  - Added loading.tsx files for route groups
  - Reference: https://github.com/vercel/next.js/discussions/57565

- [x] **5. Pyramid labels - Fix Strategic/Technical focus**
  - Added "Strategic Focus" at TOP of right axis
  - Added "Technical Focus" at BOTTOM of right axis
  - File: `src/components/marketing/value-pyramid.tsx`

- [x] **6. Rename Docs to My Account**
  - Changed navigation link from "Docs" to "My Account"
  - Now points to `/dashboard`
  - File: `src/config/site.ts`

- [x] **7. My Account - Add homepage link**
  - Added "Back to Homepage" link with Home icon in sidebar
  - File: `src/components/dashboard/sidebar.tsx`

- [x] **8. Dashboard Current Plan redundancy**
  - Removed "Plan" stat card from stats grid (was redundant)
  - Kept the more prominent tier banner at top
  - Changed grid from 4 columns to 3 columns
  - File: `src/app/(dashboard)/dashboard/page.tsx`
