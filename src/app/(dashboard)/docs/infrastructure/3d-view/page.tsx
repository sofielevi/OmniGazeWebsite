import Link from "next/link";
import {
  Box,
  Move3d,
  ZoomIn,
  RotateCcw,
  Filter,
  Palette,
  Camera,
  Maximize,
  ArrowRight,
  Mouse,
  Keyboard,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function ThreeDViewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">3D Visualization</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Explore your infrastructure in an interactive 3D environment.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Interactive 3D View</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze&apos;s 3D visualization provides a unique way to understand your
          infrastructure topology. Servers, applications, and their connections are
          rendered in an interactive 3D space.
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="aspect-video bg-[var(--bg-elevated)] rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Box className="w-16 h-16 text-[var(--amber-400)] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)]">
                3D View renders your infrastructure as an interactive graph
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <ViewFeature icon={Move3d} label="Pan & Rotate" />
            <ViewFeature icon={ZoomIn} label="Zoom In/Out" />
            <ViewFeature icon={Filter} label="Filter Nodes" />
            <ViewFeature icon={Palette} label="Color Coding" />
          </div>
        </div>
      </section>

      {/* Controls */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Navigation Controls</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ControlCard
            icon={Mouse}
            title="Mouse Controls"
            controls={[
              { action: "Left Click + Drag", description: "Rotate the view" },
              { action: "Right Click + Drag", description: "Pan the view" },
              { action: "Scroll Wheel", description: "Zoom in/out" },
              { action: "Double Click", description: "Focus on node" },
              { action: "Click Node", description: "Select and show details" },
            ]}
          />
          <ControlCard
            icon={Keyboard}
            title="Keyboard Shortcuts"
            controls={[
              { action: "R", description: "Reset view" },
              { action: "F", description: "Fit all nodes in view" },
              { action: "H", description: "Toggle node labels" },
              { action: "L", description: "Toggle connection lines" },
              { action: "Esc", description: "Deselect current node" },
              { action: "1-5", description: "Switch color schemes" },
            ]}
          />
        </div>
      </section>

      {/* Node Types */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Node Types</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Different node types are represented with distinct shapes and colors:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NodeType shape="cube" color="blue" label="Servers" />
            <NodeType shape="sphere" color="green" label="Applications" />
            <NodeType shape="cylinder" color="amber" label="Databases" />
            <NodeType shape="diamond" color="purple" label="Clusters" />
          </div>
        </div>
        <Callout type="info" title="Connection Lines">
          Lines between nodes represent network connections or dependencies. Thicker lines
          indicate more active connections. Hover over a line to see connection details.
        </Callout>
      </section>

      {/* Filtering */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Filtering & Highlighting</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Focus on specific parts of your infrastructure using filters:
        </p>
        <div className="space-y-4">
          <FilterOption
            title="By Type"
            description="Show only servers, applications, or databases."
            example="Filter → Type → Databases"
          />
          <FilterOption
            title="By Environment"
            description="Filter by production, staging, development, or test."
            example="Filter → Environment → Production"
          />
          <FilterOption
            title="By Subnet"
            description="Show nodes within a specific IP range."
            example="Filter → Subnet → 10.0.1.0/24"
          />
          <FilterOption
            title="By Tag"
            description="Filter using custom tags you&apos;ve applied."
            example="Filter → Tag → critical-path"
          />
          <FilterOption
            title="Connected To"
            description="Show all nodes connected to a selected node."
            example="Right-click → Show Connected"
          />
        </div>
      </section>

      {/* Color Schemes */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Color Schemes</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Change the coloring to highlight different aspects:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ColorScheme
            name="By Type"
            description="Default scheme - colors by node type (server, app, database)."
            shortcut="Press 1"
          />
          <ColorScheme
            name="By Environment"
            description="Production (red), Staging (yellow), Dev (green), Test (blue)."
            shortcut="Press 2"
          />
          <ColorScheme
            name="By Status"
            description="Healthy (green), Warning (yellow), Critical (red)."
            shortcut="Press 3"
          />
          <ColorScheme
            name="By OS"
            description="Windows (blue), Linux (orange), Network devices (gray)."
            shortcut="Press 4"
          />
        </div>
      </section>

      {/* Performance Tips */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Performance Tips</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For large infrastructures, optimize the 3D view for smooth performance:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <ul className="space-y-3">
            <PerformanceTip
              tip="Reduce node count"
              description="Use filters to show only relevant nodes. Aim for under 500 nodes at once."
            />
            <PerformanceTip
              tip="Disable labels"
              description="Press H to hide node labels. Labels reduce performance with many nodes."
            />
            <PerformanceTip
              tip="Use simplified rendering"
              description="Settings → 3D View → Enable 'Simple Mode' for basic shapes."
            />
            <PerformanceTip
              tip="Hardware acceleration"
              description="Ensure your GPU drivers are up to date for best WebGL performance."
            />
            <PerformanceTip
              tip="Close other applications"
              description="Free up GPU memory by closing other graphics-intensive applications."
            />
          </ul>
        </div>
      </section>

      {/* Export & Sharing */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Export & Sharing</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Capture and share your 3D views:
        </p>
        <CommandBlock language="text" title="Export Options">
          {`• Screenshot: Ctrl+Shift+S or Camera icon
• High-res export: File → Export → PNG (4K)
• Interactive HTML: File → Export → Interactive HTML
• Video recording: View → Record → Start Recording`}
        </CommandBlock>
        <Callout type="tip" title="Presentations">
          Export as Interactive HTML to share with stakeholders who don&apos;t have OmniGaze.
          They can rotate, zoom, and explore the view in any web browser.
        </Callout>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Set up secure scanning with proper credentials.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/security/winrm-setup"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            WinRM Setup
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/security/credentials"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Credential Management
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ViewFeature({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      <span className="text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}

function ControlCard({
  icon: Icon,
  title,
  controls,
}: {
  icon: React.ElementType;
  title: string;
  controls: { action: string; description: string }[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="space-y-2">
        {controls.map((ctrl, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <code className="bg-[var(--bg-elevated)] px-2 py-0.5 rounded text-[var(--amber-400)] text-xs whitespace-nowrap">
              {ctrl.action}
            </code>
            <span className="text-[var(--text-secondary)]">{ctrl.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NodeType({
  shape,
  color,
  label,
}: {
  shape: string;
  color: string;
  label: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-[var(--amber-400)]",
    purple: "bg-purple-500",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 ${colorClasses[color]} rounded-lg opacity-80`} />
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      <span className="text-xs text-[var(--text-secondary)] capitalize">({shape})</span>
    </div>
  );
}

function FilterOption({
  title,
  description,
  example,
}: {
  title: string;
  description: string;
  example: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)] mb-2">{description}</p>
      <code className="text-xs text-[var(--amber-400)] bg-[var(--bg-elevated)] px-2 py-1 rounded">
        {example}
      </code>
    </div>
  );
}

function ColorScheme({
  name,
  description,
  shortcut,
}: {
  name: string;
  description: string;
  shortcut: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium">{name}</h4>
        <code className="text-xs text-[var(--amber-400)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded">
          {shortcut}
        </code>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function PerformanceTip({
  tip,
  description,
}: {
  tip: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-[var(--amber-400)] mt-0.5">•</span>
      <div>
        <span className="font-medium">{tip}</span>
        <span className="text-[var(--text-secondary)]"> — {description}</span>
      </div>
    </li>
  );
}
