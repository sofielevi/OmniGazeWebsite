# WEB-04: Purchase Flow

**Priority:** P0 (Critical Path)
**Estimated Hours:** 16h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________
**Depends On:** WEB-01 (Infrastructure), WEB-03 (Registration)
**Blocked By:** Self-Service 07-PAYMENT-INTEGRATION

---

## Objective

Implement the complete purchase flow using Stripe Checkout for tier upgrades and new subscriptions. Includes webhook handling for subscription events.

---

## Prerequisites

- [ ] WEB-01-INFRASTRUCTURE complete
- [ ] WEB-03-REGISTRATION complete (auth working)
- [ ] Stripe account configured with products/prices
- [ ] OmniGaze API payment endpoints deployed:
  - `POST /api/Customer/Upgrade`
  - Stripe webhook handler in API
- [ ] Stripe test mode credentials

---

## User Journey

```
+----------+     +-----------+     +-----------+     +-----------+
| Pricing  | --> |  Select   | --> |  Stripe   | --> |  Success  |
| Page     |     |   Tier    |     | Checkout  |     |   Page    |
+----------+     +-----------+     +-----------+     +-----------+
                                                           |
                                                           v
                                                    +-----------+
                                                    | Dashboard |
                                                    | (Upgraded)|
                                                    +-----------+
```

---

## Stripe Product Configuration

### Products to Create in Stripe Dashboard

| Product | Monthly Price ID | Annual Price ID |
|---------|-----------------|-----------------|
| Starter | `price_starter_monthly` | `price_starter_annual` |
| Professional | `price_professional_monthly` | `price_professional_annual` |
| Business | `price_business_monthly` | `price_business_annual` |
| Enterprise | Custom (Contact Sales) | Custom |

### Price Configuration

| Tier | Monthly | Annual | Annual Savings |
|------|---------|--------|----------------|
| Starter | $99 | $990 (=$82.50/mo) | 17% |
| Professional | $349 | $3,490 (=$290.83/mo) | 17% |
| Business | $799 | $7,990 (=$665.83/mo) | 17% |

---

## Tasks

### 1. Stripe Setup

- [ ] **Stripe SDK Installation** (already in WEB-01)
- [ ] **Stripe Client Configuration**
  ```typescript
  // src/lib/stripe.ts
  import Stripe from 'stripe';

  export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  // Client-side
  import { loadStripe } from '@stripe/stripe-js';
  export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  ```

- [ ] **Price ID Mapping**
  ```typescript
  // src/config/stripe.ts
  export const STRIPE_PRICES = {
    starter: {
      monthly: 'price_xxx',
      annual: 'price_xxx',
    },
    professional: {
      monthly: 'price_xxx',
      annual: 'price_xxx',
    },
    business: {
      monthly: 'price_xxx',
      annual: 'price_xxx',
    },
  };
  ```

### 2. Checkout API Route

- [ ] **Create Checkout Session** (`src/app/api/stripe/checkout/route.ts`)
  ```typescript
  export async function POST(req: Request) {
    const { priceId, customerId, tierName } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: user.email,
      metadata: {
        customerId,
        tierName,
      },
      subscription_data: {
        metadata: {
          customerId,
          tierName,
        },
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  }
  ```

### 3. Webhook Handler

- [ ] **Webhook Route** (`src/app/api/stripe/webhook/route.ts`)
  ```typescript
  export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      return new Response('Webhook signature verification failed', { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
    }

    return new Response('OK');
  }
  ```

- [ ] **Webhook Event Handlers**
  - `checkout.session.completed` -> Update tier via OmniGaze API
  - `customer.subscription.updated` -> Sync subscription status
  - `customer.subscription.deleted` -> Handle cancellation
  - `invoice.payment_failed` -> Notify user

### 4. Purchase UI Components

- [ ] **Tier Selection Modal/Page**
  - Display available upgrade tiers
  - Monthly/Annual toggle
  - Price comparison
  - Feature comparison (what you'll get)
  - "Subscribe" button per tier

- [ ] **Checkout Button Component**
  ```typescript
  function CheckoutButton({ priceId, tierName }: Props) {
    const handleCheckout = async () => {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId, tierName }),
      });
      const { url } = await res.json();
      window.location.href = url;
    };

    return <Button onClick={handleCheckout}>Subscribe to {tierName}</Button>;
  }
  ```

### 5. Success Page (`/checkout/success`)

- [ ] **Retrieve Session Details**
  ```typescript
  // Get session_id from URL
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  ```

- [ ] **Success Message**
  - "Welcome to [Tier]!"
  - Subscription details
  - Next billing date
  - Receipt link

- [ ] **Next Steps**
  - Dashboard link
  - Download link (if new user)
  - Feature tour

### 6. Cancel Page (`/checkout/cancel`)

- [ ] "Purchase Canceled" message
- [ ] Return to pricing link
- [ ] Support contact

### 7. Subscription Management

- [ ] **Current Subscription Display** (in dashboard)
  - Current tier
  - Billing cycle
  - Next billing date
  - Price

- [ ] **Upgrade Options**
  - Show higher tiers
  - Prorated upgrade pricing
  - Upgrade button

- [ ] **Manage Subscription Button**
  ```typescript
  // Create Stripe Customer Portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
  });
  ```

- [ ] **Stripe Customer Portal Features**
  - Update payment method
  - View invoices
  - Cancel subscription
  - Change billing cycle

### 8. Upgrade Flow (Existing Customers)

- [ ] **In-Dashboard Upgrade**
  - "Upgrade" button in dashboard
  - Tier comparison modal
  - Checkout redirect

- [ ] **Prorated Pricing**
  - Stripe handles proration automatically
  - Display prorated amount before checkout

### 9. Enterprise Contact Form

- [ ] **Contact Sales Page** (`/enterprise`)
  - Company name
  - Contact name
  - Email
  - Phone
  - Number of servers
  - Use case description
  - Submit button

- [ ] **Form Submission**
  - Send to CRM/email
  - Confirmation message

---

## Stripe Test Mode

### Test Card Numbers
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires Auth:** 4000 0025 0000 3155

### Webhook Testing
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
```

---

## Error Handling

| Scenario | User Message | Action |
|----------|--------------|--------|
| Payment declined | "Payment failed. Please try another card." | Return to checkout |
| Webhook failed | (Internal) Log error, retry | Alert admin |
| Session expired | "Session expired. Please try again." | Redirect to pricing |
| Already subscribed | "You already have an active subscription." | Redirect to dashboard |

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/api/stripe/checkout/route.ts` | Create checkout session |
| `src/app/api/stripe/webhook/route.ts` | Handle Stripe webhooks |
| `src/app/api/stripe/portal/route.ts` | Create customer portal session |
| `src/app/checkout/success/page.tsx` | Success page |
| `src/app/checkout/cancel/page.tsx` | Cancel page |
| `src/app/enterprise/page.tsx` | Enterprise contact form |
| `src/lib/stripe.ts` | Stripe utilities |
| `src/config/stripe.ts` | Price ID configuration |
| `src/components/checkout/checkout-button.tsx` | Checkout button |
| `src/components/checkout/tier-selector.tsx` | Tier selection UI |
| `src/components/dashboard/subscription-card.tsx` | Subscription display |

---

## Testing Scenarios

- [ ] New subscription (monthly) - happy path
- [ ] New subscription (annual)
- [ ] Upgrade from lower tier
- [ ] Payment declined
- [ ] Webhook - checkout completed
- [ ] Webhook - subscription canceled
- [ ] Webhook - payment failed
- [ ] Customer portal access
- [ ] Enterprise contact form submission

---

## Security Considerations

- [ ] Validate webhook signatures
- [ ] Never expose secret key to client
- [ ] Verify user owns the subscription being modified
- [ ] Rate limit checkout session creation

---

## Verification Checklist

- [ ] Checkout redirects to Stripe
- [ ] Successful payment updates tier
- [ ] Webhook handler processes events
- [ ] Customer portal accessible
- [ ] Test mode payments work
- [ ] Error states handled gracefully

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] Full purchase flow tested end-to-end
- [ ] Webhook events processed correctly
- [ ] Customer portal working
- [ ] Deployed to staging
