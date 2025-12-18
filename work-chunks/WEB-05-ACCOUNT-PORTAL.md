# WEB-05: Account Portal

**Priority:** P1 (High)
**Estimated Hours:** 20h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________
**Depends On:** WEB-01 (Infrastructure), WEB-03 (Registration), WEB-04 (Purchase)

---

## Objective

Build the authenticated customer dashboard for managing subscriptions, viewing licenses, accessing billing history, and managing team members (Business+ tiers).

---

## Prerequisites

- [ ] WEB-01-INFRASTRUCTURE complete
- [ ] WEB-03-REGISTRATION complete (auth working)
- [ ] WEB-04-PURCHASE-FLOW complete (Stripe integration)
- [ ] OmniGaze API dashboard endpoints available

---

## Dashboard Structure

```
/dashboard
+-- /dashboard                  # Overview
+-- /dashboard/subscription     # Subscription management
+-- /dashboard/licenses         # License keys
+-- /dashboard/billing          # Billing history
+-- /dashboard/team             # Team management (Business+)
+-- /dashboard/settings         # Profile settings
```

---

## Tasks

### 1. Dashboard Layout

- [ ] **Sidebar Navigation**
  - Logo
  - Navigation items with icons
  - Current tier badge
  - User profile dropdown
  - Mobile sidebar (sheet)

- [ ] **Header**
  - Page title
  - Breadcrumbs (optional)
  - Actions area

- [ ] **Layout Component**
  ```typescript
  // src/app/(dashboard)/layout.tsx
  export default function DashboardLayout({ children }) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <Header />
          {children}
        </main>
      </div>
    );
  }
  ```

### 2. Dashboard Overview (`/dashboard`)

- [ ] **Welcome Card**
  - User name
  - Current tier with badge
  - Quick stats

- [ ] **Usage Summary**
  - Server count vs limit
  - User count vs limit (if applicable)
  - Progress bars

- [ ] **Quick Actions**
  - Download installer
  - View licenses
  - Upgrade tier
  - Get support

- [ ] **Recent Activity** (optional)
  - Recent scans
  - License activations
  - Billing events

### 3. Subscription Page (`/dashboard/subscription`)

- [ ] **Current Plan Card**
  - Tier name with badge
  - Price / billing cycle
  - Next billing date
  - "Manage Subscription" button (Stripe Portal)

- [ ] **Usage Meters**
  - Server usage: X / Y servers
  - User usage: X / Y users
  - Visual progress bars
  - Warning when near limit

- [ ] **Upgrade Options**
  - Available higher tiers
  - Feature comparison
  - "Upgrade" buttons

- [ ] **Tier Features**
  - List of included features
  - Checkmarks for available
  - "Upgrade to unlock" for unavailable

### 4. Licenses Page (`/dashboard/licenses`)

- [ ] **License Key Display**
  - Current license key
  - Copy button
  - QR code (optional)

- [ ] **Activations Table**
  - Machine name
  - Activation date
  - Last seen
  - Status (active/inactive)
  - Deactivate button

- [ ] **Activation Limit**
  - X / Y activations used
  - Warning when near limit

- [ ] **Generate New Key** (if allowed)
  - Button to regenerate
  - Confirmation modal
  - Note: deactivates old key

### 5. Billing Page (`/dashboard/billing`)

- [ ] **Payment Method**
  - Current card (last 4 digits)
  - Expiration date
  - "Update Payment Method" button (Stripe Portal)

- [ ] **Invoice History Table**
  | Column | Description |
  |--------|-------------|
  | Date | Invoice date |
  | Description | Tier name + period |
  | Amount | $XX.XX |
  | Status | Paid/Pending/Failed |
  | Actions | Download PDF |

- [ ] **Upcoming Invoice**
  - Next billing date
  - Amount due
  - Period covered

- [ ] **Stripe Portal Link**
  - "Manage Billing" button
  - Opens Stripe Customer Portal

### 6. Team Page (`/dashboard/team`)

**Note:** Only available for Business and Enterprise tiers.

- [ ] **Tier Gate**
  - Check if user is Business+ tier
  - Show upgrade prompt if not

- [ ] **Team Members Table**
  | Column | Description |
  |--------|-------------|
  | Name | Member name |
  | Email | Member email |
  | Role | Admin/Member |
  | Status | Active/Pending |
  | Actions | Edit/Remove |

- [ ] **Invite Member**
  - "Invite" button
  - Email input modal
  - Role selection
  - Send invite

- [ ] **User Limit Display**
  - X / Y team members
  - Upgrade prompt if at limit

- [ ] **Pending Invites**
  - List of sent invites
  - Resend / Cancel options

### 7. Settings Page (`/dashboard/settings`)

- [ ] **Profile Section**
  - Name (editable)
  - Email (display only)
  - Company name

- [ ] **Password Section**
  - Current password
  - New password
  - Confirm password
  - "Update Password" button

- [ ] **Notification Preferences**
  - Email notifications toggle
  - Newsletter toggle
  - Product updates toggle

- [ ] **Danger Zone**
  - "Delete Account" button
  - Confirmation modal
  - Warning about data loss

---

## API Integration

### Required Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/Tier/Current` | GET | Get current tier + usage |
| `/api/License/Activations` | GET | Get license activations |
| `/api/License/Deactivate` | POST | Deactivate a machine |
| `/api/Customer/Profile` | GET | Get profile info |
| `/api/Customer/Profile` | PUT | Update profile |
| `/api/Team/Members` | GET | Get team members |
| `/api/Team/Invite` | POST | Send invite |
| `/api/Team/Remove` | DELETE | Remove member |

### Data Fetching Pattern

```typescript
// Use TanStack Query for server state
import { useQuery, useMutation } from '@tanstack/react-query';

function useCurrentTier() {
  return useQuery({
    queryKey: ['tier', 'current'],
    queryFn: () => omnigazeApi.tiers.getCurrent(),
  });
}

function useActivations() {
  return useQuery({
    queryKey: ['license', 'activations'],
    queryFn: () => omnigazeApi.license.getActivations(),
  });
}
```

---

## UI Components

### Shared Dashboard Components

| Component | Purpose |
|-----------|---------|
| `Sidebar` | Navigation sidebar |
| `DashboardHeader` | Page header with actions |
| `StatCard` | Metric display card |
| `UsageMeter` | Progress bar with limit |
| `TierBadge` | Tier name badge |
| `DataTable` | Sortable/filterable table |
| `EmptyState` | No data placeholder |

### Page-Specific Components

| Component | Page |
|-----------|------|
| `SubscriptionCard` | Subscription |
| `UpgradePrompt` | Subscription |
| `LicenseKeyCard` | Licenses |
| `ActivationsTable` | Licenses |
| `InvoiceTable` | Billing |
| `TeamMembersTable` | Team |
| `InviteMemberModal` | Team |
| `ProfileForm` | Settings |
| `PasswordForm` | Settings |

---

## Authorization

### Route Protection

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
```

### Tier-Based Access

```typescript
// src/lib/auth.ts
export function canAccessFeature(user: User, feature: string): boolean {
  const tierFeatures = TIER_FEATURES[user.tier];
  return tierFeatures.includes(feature);
}

// In component
if (!canAccessFeature(user, 'team_management')) {
  return <UpgradePrompt feature="team_management" />;
}
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/(dashboard)/layout.tsx` | Dashboard layout |
| `src/app/(dashboard)/dashboard/page.tsx` | Overview page |
| `src/app/(dashboard)/dashboard/subscription/page.tsx` | Subscription |
| `src/app/(dashboard)/dashboard/licenses/page.tsx` | Licenses |
| `src/app/(dashboard)/dashboard/billing/page.tsx` | Billing |
| `src/app/(dashboard)/dashboard/team/page.tsx` | Team |
| `src/app/(dashboard)/dashboard/settings/page.tsx` | Settings |
| `src/components/dashboard/sidebar.tsx` | Sidebar |
| `src/components/dashboard/header.tsx` | Header |
| `src/components/dashboard/stat-card.tsx` | Stat card |
| `src/components/dashboard/usage-meter.tsx` | Usage meter |
| `src/components/dashboard/tier-badge.tsx` | Tier badge |
| `src/components/dashboard/subscription-card.tsx` | Subscription display |
| `src/components/dashboard/license-card.tsx` | License display |
| `src/components/dashboard/activations-table.tsx` | Activations |
| `src/components/dashboard/invoice-table.tsx` | Invoices |
| `src/components/dashboard/team-table.tsx` | Team members |
| `src/components/dashboard/invite-modal.tsx` | Invite modal |
| `src/components/dashboard/profile-form.tsx` | Profile form |

---

## Testing Scenarios

- [ ] Dashboard loads with correct user data
- [ ] Usage meters show correct values
- [ ] Subscription card displays correct info
- [ ] Upgrade flow from dashboard
- [ ] License key copy works
- [ ] Activations table loads
- [ ] Deactivate machine works
- [ ] Invoice history loads
- [ ] Stripe portal link works
- [ ] Team page (Business tier)
- [ ] Team page blocked (lower tiers)
- [ ] Invite team member
- [ ] Remove team member
- [ ] Profile update
- [ ] Password change

---

## Responsive Design

| Breakpoint | Sidebar | Layout |
|------------|---------|--------|
| Mobile | Hidden (sheet) | Single column |
| Tablet | Collapsed icons | Responsive grid |
| Desktop | Full sidebar | Multi-column |

---

## Verification Checklist

- [ ] All pages render correctly
- [ ] Data fetches successfully
- [ ] Mutations work (updates, deletes)
- [ ] Tier-based access working
- [ ] Stripe Portal integration working
- [ ] Mobile responsive
- [ ] Loading states handled
- [ ] Error states handled

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] All dashboard pages functional
- [ ] API integration verified
- [ ] Deployed to staging
- [ ] User acceptance testing passed
