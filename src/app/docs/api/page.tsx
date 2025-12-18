import { Code, Database, Lock, Globe } from "lucide-react";

export const metadata = {
  title: "API Reference",
  description: "OmniGaze OData API documentation for integrations and automation.",
};

export default function ApiPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">API Reference</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Access your OmniGaze data programmatically using the OData REST API.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pyramid-capabilities)]/20 text-[var(--pyramid-capabilities)] text-xs font-medium">
          Professional Tier and Above
        </div>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-[var(--amber-400)]" />
          Overview
        </h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            OmniGaze exposes an OData v4 REST API that allows you to query and export
            your discovered infrastructure data. The API supports:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• Standard OData query options ($filter, $select, $expand, $orderby)</li>
            <li>• JSON and XML response formats</li>
            <li>• Pagination with $top and $skip</li>
            <li>• Full-text search</li>
          </ul>
        </div>
      </section>

      {/* Authentication */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-[var(--amber-400)]" />
          Authentication
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">API Key Authentication</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Include your API key in the request header:
            </p>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers
Host: localhost:5000
X-API-Key: your-api-key-here`}
            </pre>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Getting Your API Key</h3>
            <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>1. Open OmniGaze Settings</li>
              <li>2. Go to the API tab</li>
              <li>3. Click Generate API Key</li>
              <li>4. Copy and store securely</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-[var(--amber-400)]" />
          Available Endpoints
        </h2>

        <div className="space-y-4">
          <EndpointCard
            method="GET"
            path="/odata/Servers"
            description="List all discovered servers"
          />
          <EndpointCard
            method="GET"
            path="/odata/Servers({id})"
            description="Get a specific server by ID"
          />
          <EndpointCard
            method="GET"
            path="/odata/Applications"
            description="List all discovered applications"
          />
          <EndpointCard
            method="GET"
            path="/odata/Services"
            description="List all running services"
          />
          <EndpointCard
            method="GET"
            path="/odata/Connections"
            description="List network connections between servers"
          />
          <EndpointCard
            method="GET"
            path="/odata/Processes"
            description="List running processes (requires Process Scan)"
          />
        </div>
      </section>

      {/* Query Examples */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-[var(--amber-400)]" />
          Query Examples
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Filter Windows Servers</h3>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers?$filter=OperatingSystem eq 'Windows'`}
            </pre>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Select Specific Fields</h3>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers?$select=Hostname,IPAddress,LastScan`}
            </pre>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Expand Related Data</h3>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers?$expand=Applications,Services`}
            </pre>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Pagination</h3>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers?$top=50&$skip=100&$count=true`}
            </pre>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Complex Filter</h3>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`GET /odata/Servers?$filter=OperatingSystem eq 'Linux'
  and Memory gt 16000
  and contains(Hostname,'prod')`}
            </pre>
          </div>
        </div>
      </section>

      {/* Response Format */}
      <section>
        <h2 className="font-display text-2xl mb-4">Response Format</h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <h3 className="font-medium mb-3">Example Response</h3>
          <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "@odata.context": "http://localhost:5000/odata/$metadata#Servers",
  "@odata.count": 150,
  "value": [
    {
      "Id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "Hostname": "web-server-01",
      "IPAddress": "192.168.1.100",
      "OperatingSystem": "Windows Server 2022",
      "Memory": 32768,
      "CPUCores": 8,
      "LastScan": "2024-12-18T10:30:00Z",
      "Status": "Online"
    }
  ]
}`}
          </pre>
        </div>
      </section>

      {/* Rate Limits */}
      <section>
        <h2 className="font-display text-2xl mb-4">Rate Limits</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            The OmniGaze API has the following rate limits:
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <span className="text-[var(--text-muted)]">Professional:</span>
              <span className="ml-2 font-medium">100 requests/minute</span>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <span className="text-[var(--text-muted)]">Business:</span>
              <span className="ml-2 font-medium">500 requests/minute</span>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <span className="text-[var(--text-muted)]">Enterprise:</span>
              <span className="ml-2 font-medium">Unlimited</span>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Client Libraries</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Use any OData client library to interact with the API. Popular options include:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Simple.OData.Client (.NET)", "OData.Client (Python)", "o.js (JavaScript)", "curl"].map((lib) => (
            <span
              key={lib}
              className="px-3 py-1 bg-[var(--bg-elevated)] rounded text-sm text-[var(--text-secondary)]"
            >
              {lib}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function EndpointCard({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 flex items-center gap-4">
      <span className="px-2 py-1 bg-[var(--success)]/20 text-[var(--success)] text-xs font-mono font-medium rounded">
        {method}
      </span>
      <code className="font-mono text-sm text-[var(--amber-400)]">{path}</code>
      <span className="text-sm text-[var(--text-muted)] ml-auto">{description}</span>
    </div>
  );
}
