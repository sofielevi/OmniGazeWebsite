import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateContact, type LeadSource } from "@/lib/hubspot";
import { sendLeadNotification } from "@/lib/email";

interface ContactFormData {
  type: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  linkedinUrl?: string;
  serverCountRange?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactFormData;

    // Validate type
    const validTypes = ["quote", "demo", "community_download", "resource_download"];
    if (!body.type || !validTypes.includes(body.type)) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    // Validate email format
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Resource downloads only require email
    if (body.type !== "resource_download") {
      if (!body.firstName || !body.lastName || !body.company) {
        return NextResponse.json(
          { error: "Missing required fields: firstName, lastName, email, company" },
          { status: 400 }
        );
      }
    }

    // Validate LinkedIn URL for community downloads
    if (body.type === "community_download" && !body.linkedinUrl) {
      return NextResponse.json({ error: "LinkedIn profile URL is required" }, { status: 400 });
    }

    // Run HubSpot + email in parallel
    const [hubspotResult, emailResult] = await Promise.all([
      createOrUpdateContact({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company,
        phone: body.phone,
        linkedinUrl: body.linkedinUrl,
        leadSource: body.type,
        serverCountRange: body.serverCountRange,
        message: body.message,
      }),
      sendLeadNotification({
        type: body.type,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company,
        phone: body.phone,
        linkedinUrl: body.linkedinUrl,
        serverCountRange: body.serverCountRange,
        message: body.message,
      }),
    ]);

    // Log any non-critical failures
    if (!hubspotResult.success) {
      console.error("HubSpot sync failed:", hubspotResult.error);
    }
    if (!emailResult.success) {
      console.error("Email notification failed:", emailResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
