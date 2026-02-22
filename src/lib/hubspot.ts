export type LeadSource = "quote" | "demo" | "community_download" | "resource_download";

export interface HubSpotContactData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  linkedinUrl?: string;
  leadSource: LeadSource;
  serverCountRange?: string;
  message?: string;
}

/**
 * Creates or updates a HubSpot contact via the CRM v3 API.
 * Uses the HUBSPOT_ACCESS_TOKEN environment variable.
 */
export async function createOrUpdateContact(data: HubSpotContactData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    console.warn("HUBSPOT_ACCESS_TOKEN not configured, skipping HubSpot sync");
    return { success: true }; // Don't fail if HubSpot isn't configured yet
  }

  const properties: Record<string, string> = {
    firstname: data.firstName,
    lastname: data.lastName,
    email: data.email,
    company: data.company,
    lead_source: data.leadSource,
  };

  if (data.phone) properties.phone = data.phone;
  if (data.linkedinUrl) properties.linkedin_url = data.linkedinUrl;
  if (data.serverCountRange) properties.server_count_range = data.serverCountRange;
  if (data.message) properties.message = data.message;

  try {
    // Try to create the contact first
    const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ properties }),
    });

    if (createRes.ok) {
      return { success: true };
    }

    // If contact already exists (409 conflict), update instead
    if (createRes.status === 409) {
      const updateRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(data.email)}?idProperty=email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ properties }),
        }
      );

      if (updateRes.ok) {
        return { success: true };
      }

      const updateErr = await updateRes.text();
      console.error("HubSpot update failed:", updateErr);
      return { success: false, error: "Failed to update contact in HubSpot" };
    }

    const createErr = await createRes.text();
    console.error("HubSpot create failed:", createErr);
    return { success: false, error: "Failed to create contact in HubSpot" };
  } catch (err) {
    console.error("HubSpot API error:", err);
    return { success: false, error: "HubSpot API connection error" };
  }
}
