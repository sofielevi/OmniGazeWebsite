import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Create a Stripe Customer Portal session
 * Allows customers to manage their subscription, update payment methods, view invoices
 */
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

    // Get customer ID from request body or session
    const body = await request.json().catch(() => ({}));
    let customerId = body.customerId;

    // If no customer ID provided, try to get from session cookie
    if (!customerId) {
      const stripeCustomerId = request.cookies.get("stripe_customer_id")?.value;
      if (stripeCustomerId) {
        customerId = stripeCustomerId;
      }
    }

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID required" },
        { status: 400 }
      );
    }

    // Create Stripe Customer Portal session
    const stripeResponse = await fetch(
      "https://api.stripe.com/v1/billing_portal/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          customer: customerId,
          return_url: `${APP_URL}/dashboard/subscription`,
        }),
      }
    );

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.json();
      console.error("Stripe API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create portal session" },
        { status: 500 }
      );
    }

    const session = await stripeResponse.json();

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Portal session error:", error);
    return NextResponse.json(
      { error: "An error occurred creating portal session" },
      { status: 500 }
    );
  }
}
