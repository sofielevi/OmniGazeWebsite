export interface LeadNotificationData {
  type: "quote" | "demo" | "community_download" | "resource_download";
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  linkedinUrl?: string;
  serverCountRange?: string;
  message?: string;
}

const SALES_EMAIL = process.env.SALES_NOTIFICATION_EMAIL || "sales@omnigaze.com";

/**
 * Sends a lead notification email to the sales team.
 * Uses the Resend API (RESEND_API_KEY env var).
 */
export async function sendLeadNotification(data: LeadNotificationData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured, skipping email notification");
    return { success: true }; // Don't fail if email isn't configured yet
  }

  const typeLabels: Record<string, string> = {
    quote: "New Quote Request",
    demo: "New Demo Request",
    community_download: "New Community Download Request",
    resource_download: "New Resource Download",
  };

  const subject = `${typeLabels[data.type] || "New Lead"} - ${data.company}`;

  const lines = [
    `<h2>${typeLabels[data.type] || "New Lead"}</h2>`,
    `<table style="border-collapse:collapse;width:100%;max-width:500px;">`,
    row("Name", `${data.firstName} ${data.lastName}`),
    row("Email", `<a href="mailto:${data.email}">${data.email}</a>`),
    row("Company", data.company),
  ];

  if (data.phone) lines.push(row("Phone", data.phone));
  if (data.linkedinUrl) lines.push(row("LinkedIn", `<a href="${data.linkedinUrl}">${data.linkedinUrl}</a>`));
  if (data.serverCountRange) lines.push(row("Server Count", data.serverCountRange));
  if (data.message) lines.push(row("Message", data.message));

  lines.push("</table>");

  if (data.type === "community_download") {
    lines.push(`<p style="margin-top:16px;color:#666;"><em>Please verify the LinkedIn profile before sending the Community license.</em></p>`);
  }

  const html = lines.join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "OmniGaze Website <noreply@omnigaze.com>",
        to: [SALES_EMAIL],
        subject,
        html,
      }),
    });

    if (res.ok) {
      return { success: true };
    }

    const errText = await res.text();
    console.error("Resend API error:", errText);
    return { success: false, error: "Failed to send notification email" };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Email service connection error" };
  }
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;color:#333;">${label}</td><td style="padding:8px 12px;border:1px solid #eee;color:#555;">${value}</td></tr>`;
}
