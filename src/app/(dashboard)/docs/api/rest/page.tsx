import {
  Code,
  Key,
  Server,
  Shield,
  FileJson,
  ArrowRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Callout, CommandBlock, TierBadge } from "@/components/docs";

export default function RestApiPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            REST API
          </h1>
          <TierBadge tier="professional" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Access OmniGaze data programmatically with the REST API.
        </p>
      </div>

      {/* Base URL */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Base URL
        </h2>
        <CommandBlock language="plaintext">
          https://your-omnigaze-instance.com/api
        </CommandBlock>
      </section>

      {/* Authentication */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Authentication
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          All API requests require JWT token authentication:
        </p>
        <CommandBlock language="http">
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        </CommandBlock>
        <Callout type="warning" title="Token Security">
          Keep your API tokens secure. Never expose them in client-side code or public repositories.
          Tokens should be stored in environment variables or secure vaults.
        </Callout>
      </section>

      {/* Endpoints */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Available Endpoints
        </h2>

        {/* Audit API */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Audit API</h3>
          <div className="space-y-4">
            <EndpointCard
              method="POST"
              path="/Audit/{hostname}/{audit}"
              description="Record an audit event for a specific hostname."
              params={[
                { name: "hostname", type: "string", description: "The hostname being audited" },
                { name: "audit", type: "string", description: "The audit message/description" },
              ]}
              example={`POST /api/Audit/server01.company.com/security_scan_completed
Authorization: Bearer your-jwt-token`}
              response={`{
  "status": "success",
  "message": "Audit logged successfully"
}`}
            />
            <EndpointCard
              method="POST"
              path="/Audit/{hostname}/{audit}/{audittype}"
              description="Record a typed audit event for a specific hostname."
              params={[
                { name: "hostname", type: "string", description: "The hostname being audited" },
                { name: "audit", type: "string", description: "The audit message" },
                { name: "audittype", type: "string", description: "Type: security, compliance, performance" },
              ]}
            />
          </div>
        </div>

        {/* License API */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">License API</h3>
          <EndpointCard
            method="GET"
            path="/License/status"
            description="Retrieve the current license status and details."
            response={`{
  "isValid": true,
  "expirationDate": "2024-12-31T23:59:59Z",
  "licensedFeatures": ["discovery", "vulnerability", "compliance"],
  "maxAssets": 10000,
  "currentAssetCount": 2543
}`}
          />
        </div>

        {/* Process Library API */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Process Library API</h3>
          <EndpointCard
            method="GET"
            path="/ProcessLibrary/{processName}"
            description="Retrieve information about a specific process."
            params={[
              { name: "processName", type: "string", description: "The name of the process to look up" },
            ]}
            response={`{
  "processName": "chrome.exe",
  "description": "Google Chrome Browser",
  "vendor": "Google LLC",
  "category": "Web Browser",
  "riskLevel": "Low",
  "knownVulnerabilities": []
}`}
          />
        </div>

        {/* Geo API */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Geographic API</h3>
          <EndpointCard
            method="GET"
            path="/Geo/lookup/{ipAddress}"
            description="Perform geographic lookup for an IP address."
            params={[
              { name: "ipAddress", type: "string", description: "The IP address to look up" },
            ]}
            response={`{
  "ip": "8.8.8.8",
  "country": "United States",
  "region": "California",
  "city": "Mountain View",
  "latitude": 37.4056,
  "longitude": -122.0775,
  "organization": "Google LLC"
}`}
          />
        </div>

        {/* Lifecycle API */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Lifecycle API</h3>
          <EndpointCard
            method="GET"
            path="/Lifecycle/{product}"
            description="Retrieve lifecycle information for a software product."
            params={[
              { name: "product", type: "string", description: "The product name or identifier" },
            ]}
            response={`{
  "productName": "Windows Server 2019",
  "vendor": "Microsoft",
  "releaseDate": "2018-10-02",
  "maintenanceEndDate": "2024-01-09",
  "extendedSupportEndDate": "2029-01-09",
  "lifecycleStatus": "Mainstream Support",
  "recommendedAction": "Plan migration to newer version"
}`}
          />
        </div>
      </section>

      {/* Error Handling */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Error Handling
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          All API endpoints return consistent error responses:
        </p>
        <CommandBlock language="json">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "hostname",
        "message": "Hostname is required"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/audit/server01/scan"
}`}
        </CommandBlock>

        <div className="mt-4">
          <h3 className="font-medium mb-3">Common Error Codes</h3>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg-elevated)]">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Code</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <ErrorRow code="UNAUTHORIZED" description="Invalid or missing authentication token" />
                <ErrorRow code="FORBIDDEN" description="Insufficient permissions for the operation" />
                <ErrorRow code="VALIDATION_ERROR" description="Input validation failed" />
                <ErrorRow code="NOT_FOUND" description="Requested resource not found" />
                <ErrorRow code="RATE_LIMIT_EXCEEDED" description="API rate limit exceeded" />
                <ErrorRow code="INTERNAL_ERROR" description="Unexpected server error" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Rate Limiting
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          API endpoints are rate-limited to prevent abuse:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <RateLimitCard
            title="Default"
            limit="1000 requests/hour"
            scope="per API key"
          />
          <RateLimitCard
            title="Authentication"
            limit="100 requests/hour"
            scope="per IP"
          />
          <RateLimitCard
            title="Discovery"
            limit="10 concurrent scans"
            scope="per customer"
          />
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Rate limit headers are included in responses:
        </p>
        <CommandBlock language="http">
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248600`}
        </CommandBlock>
      </section>

      {/* Azure AD Integration */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Azure AD Integration
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Enterprise customers can use Azure AD for authentication:
        </p>
        <CommandBlock language="json">
{`{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "your-domain.com",
    "TenantId": "your-tenant-id",
    "ClientId": "your-client-id"
  }
}`}
        </CommandBlock>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/api/odata"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <FileJson className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                OData Endpoints
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Query with OData syntax
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/advanced/architecture"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Server className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Architecture Mapping
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Understand the data model
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function EndpointCard({
  method,
  path,
  description,
  params,
  example,
  response,
}: {
  method: string;
  path: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  example?: string;
  response?: string;
}) {
  const methodColors: Record<string, string> = {
    GET: "bg-green-500/20 text-green-400",
    POST: "bg-blue-500/20 text-blue-400",
    PUT: "bg-yellow-500/20 text-yellow-400",
    DELETE: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-2 py-1 rounded text-xs font-mono ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm text-[var(--text-primary)]">{path}</code>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>

      {params && params.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs uppercase text-[var(--text-muted)] mb-2">Parameters</h4>
          <div className="space-y-1">
            {params.map((param) => (
              <div key={param.name} className="flex items-center gap-2 text-sm">
                <code className="text-[var(--amber-400)]">{param.name}</code>
                <span className="text-[var(--text-muted)]">({param.type})</span>
                <span className="text-[var(--text-secondary)]">- {param.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {example && (
        <div className="mb-3">
          <h4 className="text-xs uppercase text-[var(--text-muted)] mb-2">Example</h4>
          <pre className="bg-[var(--bg-elevated)] rounded-lg p-3 text-xs overflow-x-auto">
            <code>{example}</code>
          </pre>
        </div>
      )}

      {response && (
        <div>
          <h4 className="text-xs uppercase text-[var(--text-muted)] mb-2">Response</h4>
          <pre className="bg-[var(--bg-elevated)] rounded-lg p-3 text-xs overflow-x-auto">
            <code>{response}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function ErrorRow({ code, description }: { code: string; description: string }) {
  return (
    <tr>
      <td className="px-4 py-3">
        <code className="text-red-400">{code}</code>
      </td>
      <td className="px-4 py-3 text-[var(--text-secondary)]">{description}</td>
    </tr>
  );
}

function RateLimitCard({
  title,
  limit,
  scope,
}: {
  title: string;
  limit: string;
  scope: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 text-center">
      <Clock className="w-6 h-6 text-[var(--amber-400)] mx-auto mb-2" />
      <div className="font-medium">{title}</div>
      <div className="text-lg text-[var(--amber-400)]">{limit}</div>
      <div className="text-xs text-[var(--text-muted)]">{scope}</div>
    </div>
  );
}
