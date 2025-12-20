import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const OMNIGAZE_API_URL = process.env.OMNIGAZE_API_URL || "https://api.omnigaze.com";
const OMNIGAZE_API_KEY = process.env.OMNIGAZE_API_KEY;

/**
 * Verify Stripe webhook signature
 */
function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const signatureHeader = signature.split(",");
  const timestamp = signatureHeader.find((s) => s.startsWith("t="))?.slice(2);
  const v1Signature = signatureHeader.find((s) => s.startsWith("v1="))?.slice(3);

  if (!timestamp || !v1Signature) {
    return false;
  }

  // Verify timestamp is within tolerance (5 minutes)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    return false;
  }

  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return v1Signature === expectedSignature;
}

/**
 * Notify OmniGaze API of subscription changes
 */
async function notifyOmniGazeAPI(eventType: string, data: Record<string, unknown>) {
  if (!OMNIGAZE_API_KEY) {
    console.warn("OMNIGAZE_API_KEY not configured, skipping API notification");
    return;
  }

  try {
    const response = await fetch(`${OMNIGAZE_API_URL}/api/webhooks/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": OMNIGAZE_API_KEY,
      },
      body: JSON.stringify({
        eventType,
        data,
      }),
    });

    if (!response.ok) {
      console.error("Failed to notify OmniGaze API:", await response.text());
    }
  } catch (error) {
    console.error("Error notifying OmniGaze API:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    // Verify webhook signature in production
    if (STRIPE_WEBHOOK_SECRET && signature) {
      const isValid = verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET);
      if (!isValid) {
        console.error("Invalid Stripe webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      console.error("Stripe webhook secret not configured in production");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    const event = JSON.parse(body);
    const eventType = event.type;
    const eventData = event.data.object;

    console.log(`Received Stripe webhook: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case "checkout.session.completed": {
        // Customer completed checkout
        const { customer_email, subscription, metadata } = eventData;
        console.log(`Checkout completed for ${customer_email}, subscription: ${subscription}`);

        await notifyOmniGazeAPI("subscription.created", {
          email: customer_email,
          subscriptionId: subscription,
          tier: metadata?.tier,
          billingCycle: metadata?.billing_cycle,
        });
        break;
      }

      case "customer.subscription.created": {
        // New subscription created
        const { id, customer, status, items } = eventData;
        console.log(`Subscription created: ${id}, status: ${status}`);

        await notifyOmniGazeAPI("subscription.created", {
          subscriptionId: id,
          customerId: customer,
          status,
          priceId: items?.data?.[0]?.price?.id,
        });
        break;
      }

      case "customer.subscription.updated": {
        // Subscription updated (plan change, etc.)
        const { id, customer, status, items, cancel_at_period_end } = eventData;
        console.log(`Subscription updated: ${id}, status: ${status}`);

        await notifyOmniGazeAPI("subscription.updated", {
          subscriptionId: id,
          customerId: customer,
          status,
          priceId: items?.data?.[0]?.price?.id,
          cancelAtPeriodEnd: cancel_at_period_end,
        });
        break;
      }

      case "customer.subscription.deleted": {
        // Subscription cancelled
        const { id, customer } = eventData;
        console.log(`Subscription deleted: ${id}`);

        await notifyOmniGazeAPI("subscription.deleted", {
          subscriptionId: id,
          customerId: customer,
        });
        break;
      }

      case "invoice.finalized": {
        // Invoice finalized and ready to be sent
        const { id, customer_email, hosted_invoice_url, invoice_pdf, number } = eventData;
        console.log(`Invoice finalized: ${number} (${id})`);

        await notifyOmniGazeAPI("invoice.finalized", {
          invoiceId: id,
          invoiceNumber: number,
          email: customer_email,
          hostedInvoiceUrl: hosted_invoice_url,
          invoicePdfUrl: invoice_pdf,
        });
        break;
      }

      case "invoice.paid": {
        // Invoice paid successfully
        const { id, customer_email, subscription, amount_paid, hosted_invoice_url, invoice_pdf, number } = eventData;
        console.log(`Invoice paid: ${number} (${id}), amount: ${amount_paid}`);

        await notifyOmniGazeAPI("invoice.paid", {
          invoiceId: id,
          invoiceNumber: number,
          email: customer_email,
          subscriptionId: subscription,
          amountPaid: amount_paid,
          hostedInvoiceUrl: hosted_invoice_url,
          invoicePdfUrl: invoice_pdf,
        });
        break;
      }

      case "invoice.sent": {
        // Invoice email sent to customer
        const { id, customer_email, number } = eventData;
        console.log(`Invoice sent: ${number} to ${customer_email}`);
        break;
      }

      case "invoice.payment_failed": {
        // Payment failed
        const { id, customer_email, subscription, attempt_count } = eventData;
        console.log(`Invoice payment failed: ${id}, attempts: ${attempt_count}`);

        await notifyOmniGazeAPI("invoice.payment_failed", {
          invoiceId: id,
          email: customer_email,
          subscriptionId: subscription,
          attemptCount: attempt_count,
        });
        break;
      }

      case "customer.subscription.trial_will_end": {
        // Trial ending soon (3 days before)
        const { id, customer, trial_end } = eventData;
        console.log(`Trial ending for subscription: ${id}`);

        await notifyOmniGazeAPI("trial.ending", {
          subscriptionId: id,
          customerId: customer,
          trialEnd: trial_end,
        });
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Note: Next.js App Router automatically provides raw body access via request.text()
// No additional configuration needed for webhook signature verification
