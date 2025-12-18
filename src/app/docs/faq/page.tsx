import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about OmniGaze.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is OmniGaze?",
        a: "OmniGaze is an infrastructure discovery and visualization tool that automatically finds servers, applications, and dependencies across your network. It bridges the gap from infrastructure to strategy by connecting technical assets to business capabilities.",
      },
      {
        q: "What operating systems does OmniGaze run on?",
        a: "OmniGaze runs on Windows 10/11 and Windows Server 2016+. It can discover both Windows and Linux servers across your network.",
      },
      {
        q: "Do I need to install agents on my servers?",
        a: "No. OmniGaze is agentless. It uses standard protocols (WMI for Windows, SSH for Linux) to discover and collect information from your servers remotely.",
      },
      {
        q: "Is my data sent to the cloud?",
        a: "No. All discovered data is stored locally in your OmniGaze database. The only cloud communication is for license validation and software updates. Enterprise customers can opt for fully air-gapped deployments.",
      },
    ],
  },
  {
    category: "Licensing",
    questions: [
      {
        q: "What counts as a \"server\" for licensing purposes?",
        a: "Any discovered device with an IP address that runs services - Windows servers, Linux servers, VMs, and containers with IPs. Network devices (switches, routers) and workstations are counted separately and don't count against your server limit.",
      },
      {
        q: "Can I try OmniGaze before purchasing?",
        a: "Yes! The Community tier is free forever with up to 50 servers. Paid tiers also offer a 14-day free trial with no credit card required.",
      },
      {
        q: "What happens if I exceed my server limit?",
        a: "You'll receive a notification and have 14 days to either upgrade your plan or remove servers. During this grace period, discovery continues but new servers won't be added.",
      },
      {
        q: "Can I downgrade my plan?",
        a: "Downgrading is not available through self-service to prevent data loss. Please contact support to discuss downgrade options.",
      },
      {
        q: "Can I transfer my license to another machine?",
        a: "Yes. You can deactivate your license on one machine and reactivate it on another. Each license allows activations based on your tier's user limit.",
      },
    ],
  },
  {
    category: "Scanning",
    questions: [
      {
        q: "What credentials do I need for scanning?",
        a: "For Windows servers, you need a domain admin or local admin account with WMI access. For Linux servers, you need SSH access with sudo privileges. See our credentials guide for details.",
      },
      {
        q: "What ports need to be open for scanning?",
        a: "Windows: TCP 135, 445, and dynamic RPC ports (49152-65535). Linux: TCP 22 (SSH). These ports need to be accessible from the machine running OmniGaze.",
      },
      {
        q: "How long does a scan take?",
        a: "A quick discovery scan of a /24 subnet (254 hosts) typically takes 2-5 minutes. A full scan with software inventory takes longer depending on the number of servers and network speed.",
      },
      {
        q: "Can I scan servers across multiple networks?",
        a: "Yes. As long as OmniGaze has network connectivity to the target servers (either directly or via VPN/jump host), it can scan them. You can organize results by network segment.",
      },
      {
        q: "Will scanning impact server performance?",
        a: "OmniGaze's scanning is designed to be lightweight. WMI and SSH queries have minimal impact. However, we recommend scheduling intensive scans during off-peak hours for production environments.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        q: "What's the difference between 2D and 3D visualization?",
        a: "2D diagrams are traditional network maps ideal for documentation and presentations. 3D visualization adds depth and perspective, allowing you to explore complex environments more intuitively with fly-through navigation.",
      },
      {
        q: "Can I export my diagrams?",
        a: "Yes. You can export diagrams as PNG, SVG, or PDF. Data can be exported to CSV, Excel, or JSON. The API (Professional+) enables custom integrations.",
      },
      {
        q: "Does OmniGaze integrate with other tools?",
        a: "Enterprise tier includes integrations with LeanIX, ServiceNow, and Ardoq. The OData API (Professional+) allows building custom integrations with any tool.",
      },
      {
        q: "Can OmniGaze discover cloud resources?",
        a: "Azure resource discovery is available for Business and Enterprise tiers. AWS and GCP discovery is on our roadmap.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        q: "My scan shows 0 results. What's wrong?",
        a: "Common causes: 1) Incorrect credentials, 2) Firewall blocking required ports, 3) Target servers not reachable from your network. Try pinging targets first and verify credential test passes in Settings.",
      },
      {
        q: "Some servers show partial data. Why?",
        a: "Partial data usually means the scan account lacks sufficient privileges. Ensure you're using an administrator account. Some data (like process details) requires additional permissions.",
      },
      {
        q: "OmniGaze is running slowly. How can I improve performance?",
        a: "Try: 1) Reduce concurrent scans in Settings, 2) Scan smaller ranges at a time, 3) Use Discovery scan instead of Full scan for initial sweeps, 4) Ensure adequate RAM (8GB+ recommended).",
      },
      {
        q: "I'm getting 'Access Denied' errors for some servers.",
        a: "Verify: 1) The credential account has admin rights on target servers, 2) WMI service is running (Windows), 3) Remote management is enabled, 4) No GPO is blocking remote access.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Find answers to common questions about OmniGaze.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        {faqs.map((category) => (
          <a
            key={category.category}
            href={`#${category.category.toLowerCase()}`}
            className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-warm)] transition-colors"
          >
            {category.category}
          </a>
        ))}
      </div>

      {/* FAQ Sections */}
      {faqs.map((category) => (
        <section key={category.category} id={category.category.toLowerCase()}>
          <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--amber-400)]" />
            {category.category}
          </h2>

          <div className="space-y-3">
            {category.questions.map((faq, index) => (
              <details
                key={index}
                className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors">
                  <span className="font-medium text-[var(--text-primary)] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      {/* Still need help */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 text-center">
        <h3 className="font-display text-lg mb-2">Still have questions?</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="mailto:support@omnigaze.com"
            className="px-4 py-2 bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium rounded-lg hover:bg-[var(--amber-500)] transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/docs"
            className="px-4 py-2 bg-[var(--bg-elevated)] text-[var(--text-primary)] font-medium rounded-lg hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] transition-colors"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
