import { NextRequest, NextResponse } from "next/server";
import { getStripePriceId, isPurchasableTier, TierName, BillingCycle } from "@/lib/stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface CheckoutRequestBody {
  tier: TierName;
  billingCycle: BillingCycle;
}

export async function POST(request: NextRequest) {
  try {
    // Check for Stripe secret key
    if (!STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body: CheckoutRequestBody = await request.json();
    const { tier, billingCycle } = body;

    // Validate tier
    if (!tier || !isPurchasableTier(tier)) {
      return NextResponse.json(
        { error: "Invalid tier selected" },
        { status: 400 }
      );
    }

    // Validate billing cycle
    if (!billingCycle || !["monthly", "annual"].includes(billingCycle)) {
      return NextResponse.json(
        { error: "Invalid billing cycle" },
        { status: 400 }
      );
    }

    // Get the Stripe Price ID
    const priceId = getStripePriceId(tier, billingCycle);

    // Get customer email from session cookie (if logged in)
    // In production, this would validate the session and get customer info
    const customerEmail = request.cookies.get("customer_email")?.value;

    // Create Stripe Checkout Session
    // Using fetch to avoid adding stripe package to client bundle
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "payment_method_types[0]": "card",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "success_url": `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${APP_URL}/checkout/cancel`,
        "subscription_data[trial_period_days]": "14",
        "allow_promotion_codes": "true",
        "billing_address_collection": "required",
        "customer_email": customerEmail || "",
        "metadata[tier]": tier,
        "metadata[billing_cycle]": billingCycle,
      }),
    });

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.json();
      console.error("Stripe API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    const session = await stripeResponse.json();

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "An error occurred during checkout" },
      { status: 500 }
    );
  }
}
