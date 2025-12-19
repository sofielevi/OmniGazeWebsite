# 01 - Architecture & Auth

## Objective
Set up the protected docs route structure within the dashboard.

---

## Tasks

### Route Structure
- [x] Create `src/app/(dashboard)/docs/` folder
- [x] Create `layout.tsx` for docs section
- [x] Verify auth protection inherited from dashboard layout
- [x] Remove old public `/docs` route (moved to backup)

### Tier Access Utility
- [x] Create `src/lib/docs-access.ts`
- [x] Define tier hierarchy: `community < starter < professional < business < enterprise`
- [x] Create `canAccessTier(userTier, requiredTier)` function
- [x] Export tier type definitions

### Page Metadata Pattern
- [x] Define standard metadata structure for docs pages
- [x] Create overview page with section cards

### Folder Structure
```
src/app/(dashboard)/docs/
├── layout.tsx           # Docs layout with sidebar ✓
├── page.tsx             # Docs overview ✓
├── getting-started/     # Created ✓
├── infrastructure/      # Created ✓
├── security/            # Created ✓
├── applications/        # Created ✓
├── capabilities/        # Created ✓
├── advanced/            # Created ✓
└── api/                 # Created ✓
```

---

## Verification
- [x] Build succeeds without errors
- [ ] Navigate to `/dashboard/docs` while logged in → works
- [ ] Navigate to `/dashboard/docs` while logged out → redirects to login
- [x] `canAccessTier('community', 'professional')` returns `false`
- [x] `canAccessTier('professional', 'community')` returns `true`

---

## Files Created
| File | Purpose | Status |
|------|---------|--------|
| `src/app/(dashboard)/docs/layout.tsx` | Docs layout with sidebar | Done |
| `src/app/(dashboard)/docs/page.tsx` | Docs overview page | Done |
| `src/lib/docs-access.ts` | Tier access utilities | Done |

---

## Notes
- Old public `/docs` was removed (conflicted with dashboard route)
- Auth inherited from `(dashboard)/layout.tsx` - no extra code needed
- User tier comes from `getCurrentUser()` API call
- Sidebar shows lock icon + tier badge for locked content
