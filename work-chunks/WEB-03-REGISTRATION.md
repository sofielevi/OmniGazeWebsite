# WEB-03: Registration Flow

**Priority:** P0 (Critical Path)
**Estimated Hours:** 12h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________
**Depends On:** WEB-01 (Infrastructure)
**Blocked By:** Self-Service 06-EMAIL-VERIFICATION

---

## Objective

Implement the complete user registration flow including email signup, verification code entry, and account activation. Integrates with OmniGaze API.

---

## Prerequisites

- [ ] WEB-01-INFRASTRUCTURE complete
- [ ] OmniGaze API registration endpoints deployed:
  - `POST /api/Registration/Register`
  - `POST /api/Registration/Verify`
  - `POST /api/Registration/Resend`
- [ ] Email verification service working

---

## User Journey

```
+----------+     +-----------+     +-----------+     +-----------+
|  Visit   | --> |   Enter   | --> |  Check    | --> |  Enter    |
|  Site    |     |   Email   |     |  Inbox    |     |  Code     |
+----------+     +-----------+     +-----------+     +-----------+
                                                           |
                                                           v
                                   +-----------+     +-----------+
                                   |  Download | <-- |  Success  |
                                   |  OmniGaze |     |  Page     |
                                   +-----------+     +-----------+
```

---

## Tasks

### 1. Registration Page (`/register`)

- [ ] **Page Layout**
  - Clean, focused design
  - OmniGaze branding
  - Progress indicator (Step 1 of 2)

- [ ] **Email Form**
  - Email input field
  - Client-side validation (email format)
  - Terms acceptance checkbox
  - Submit button

- [ ] **Form Handling**
  - React Hook Form + Zod validation
  - Loading state during submission
  - Error handling (display API errors)
  - Rate limiting feedback

- [ ] **API Integration**
  ```typescript
  // POST /api/Registration/Register
  {
    email: "user@company.com",
    source: "Website"
  }

  // Response
  {
    success: true,
    message: "Verification email sent"
  }
  ```

### 2. Verification Page (`/verify`)

- [ ] **Page Layout**
  - "Check your email" message
  - Email address display
  - Progress indicator (Step 2 of 2)

- [ ] **Code Input**
  - 6-character input (or 6 separate boxes)
  - Auto-focus and auto-advance
  - Paste support
  - Uppercase conversion

- [ ] **Resend Functionality**
  - "Didn't receive code?" link
  - Resend button with cooldown timer
  - Rate limiting display

- [ ] **Form Handling**
  - Validation (6 alphanumeric characters)
  - Loading state
  - Error handling (invalid code, expired, max attempts)

- [ ] **API Integration**
  ```typescript
  // POST /api/Registration/Verify
  {
    email: "user@company.com",
    code: "ABC123"
  }

  // Response
  {
    success: true,
    customerId: 12345,
    licenseKey: "COMM-XXXX-XXXX-XXXX",
    tier: "Community"
  }
  ```

### 3. Success Page (`/register/success`)

- [ ] **Confirmation Message**
  - "Welcome to OmniGaze!"
  - Tier badge (Community)
  - License key display (copyable)

- [ ] **Next Steps**
  - Download button (prominent)
  - Quick start guide link
  - Dashboard link

- [ ] **Session Creation**
  - Create NextAuth session
  - Store license key in session
  - Redirect to dashboard if already logged in

### 4. Authentication Setup

- [ ] **NextAuth Configuration** (`src/lib/auth.ts`)
  ```typescript
  export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        authorize: async (credentials) => {
          // Validate against OmniGaze API
        },
      }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
      jwt: ({ token, user }) => { /* Add tier info */ },
      session: ({ session, token }) => { /* Add tier info */ },
    },
  };
  ```

- [ ] **Session Provider** (wrap app in `SessionProvider`)

- [ ] **Protected Routes**
  - Middleware for `/dashboard/*` routes
  - Redirect to login if not authenticated

### 5. Login Page (`/login`)

- [ ] **Login Form**
  - Email input
  - Password input
  - "Remember me" checkbox
  - Submit button

- [ ] **Forgot Password Link**
  - Links to `/forgot-password`

- [ ] **Registration Link**
  - "Don't have an account? Register"

- [ ] **Error Handling**
  - Invalid credentials
  - Account not verified
  - Account locked

### 6. Forgot Password Flow

- [ ] **Request Page** (`/forgot-password`)
  - Email input
  - Submit button
  - Confirmation message

- [ ] **Reset Page** (`/reset-password`)
  - Token from URL
  - New password input
  - Confirm password input
  - Password requirements display

---

## Validation Rules

### Email
- Valid email format
- Not disposable email domain (optional)

### Verification Code
- 6 alphanumeric characters
- Case insensitive
- Max 3 attempts per code
- Code expires in 24 hours

### Password (for login/reset)
- Minimum 8 characters
- At least one uppercase
- At least one number

---

## Error Messages

| Error Code | User Message |
|------------|--------------|
| `EMAIL_EXISTS` | "This email is already registered. Try logging in." |
| `RATE_LIMITED` | "Too many attempts. Please try again in X minutes." |
| `INVALID_CODE` | "Invalid verification code. Please check and try again." |
| `CODE_EXPIRED` | "This code has expired. Request a new one." |
| `MAX_ATTEMPTS` | "Too many failed attempts. Request a new code." |
| `INVALID_CREDENTIALS` | "Invalid email or password." |

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/(auth)/register/page.tsx` | Registration page |
| `src/app/(auth)/verify/page.tsx` | Verification page |
| `src/app/(auth)/register/success/page.tsx` | Success page |
| `src/app/(auth)/login/page.tsx` | Login page |
| `src/app/(auth)/forgot-password/page.tsx` | Forgot password |
| `src/app/(auth)/reset-password/page.tsx` | Reset password |
| `src/app/(auth)/layout.tsx` | Auth layout |
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth API route |
| `src/lib/auth.ts` | Auth configuration |
| `src/components/auth/email-form.tsx` | Email input form |
| `src/components/auth/code-input.tsx` | Verification code input |
| `src/components/auth/password-form.tsx` | Password form |
| `src/middleware.ts` | Route protection |

---

## Testing Scenarios

- [ ] New user registration (happy path)
- [ ] Existing email (should show error)
- [ ] Invalid email format (client validation)
- [ ] Correct verification code
- [ ] Invalid verification code
- [ ] Expired verification code
- [ ] Resend code functionality
- [ ] Rate limiting triggers
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Password reset flow

---

## Accessibility Requirements

- [ ] Form labels properly associated
- [ ] Error messages announced to screen readers
- [ ] Focus management (auto-focus first input)
- [ ] Keyboard navigation
- [ ] Loading states announced

---

## Verification Checklist

- [ ] Registration form submits successfully
- [ ] Verification code input works
- [ ] Session created after verification
- [ ] Login flow works
- [ ] Protected routes redirect properly
- [ ] Error messages display correctly
- [ ] Mobile responsive
- [ ] Accessibility audit passed

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] Full registration flow tested end-to-end
- [ ] Error scenarios handled
- [ ] Deployed to staging
- [ ] API integration verified
