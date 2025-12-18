import { Network, Layers, Maximize2, Filter, Download, Eye } from "lucide-react";

export const metadata = {
  title: "Visualization",
  description: "Understanding OmniGaze's 2D and 3D visualization capabilities.",
};

export default function VisualizationPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Visualization Guide</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          OmniGaze provides powerful visualization tools to help you understand your
          infrastructure at a glance.
        </p>
      </div>

      {/* View Types */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6 text-[var(--amber-400)]" />
          View Types
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">2D Diagram View</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Traditional network diagram showing servers, connections, and groupings.
              Ideal for documentation and presentations.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>• Auto-layout algorithms</li>
              <li>• Manual positioning</li>
              <li>• Export to PNG/SVG</li>
              <li>• Print-friendly</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">3D Visualization</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Immersive 3D view with depth and perspective. Great for exploring
              complex environments and impressing stakeholders.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>• 360° navigation</li>
              <li>• Zoom and fly-through</li>
              <li>• Connection animations</li>
              <li>• VR-ready (Enterprise)</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Process Diagram</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Shows running processes and their network connections. Helps identify
              application dependencies and data flows.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>• Process-to-process connections</li>
              <li>• Port and protocol details</li>
              <li>• Real-time updates</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Table View</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Spreadsheet-style view for detailed analysis and filtering.
              Best for inventory management and auditing.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>• Sortable columns</li>
              <li>• Advanced filtering</li>
              <li>• Bulk selection</li>
              <li>• Export to CSV/Excel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Maximize2 className="w-6 h-6 text-[var(--amber-400)]" />
          Navigation Controls
        </h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">2D Controls</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><strong>Pan:</strong> Click and drag on empty space</li>
                <li><strong>Zoom:</strong> Mouse wheel or pinch gesture</li>
                <li><strong>Select:</strong> Click on a node</li>
                <li><strong>Multi-select:</strong> Ctrl+Click or drag selection box</li>
                <li><strong>Fit to screen:</strong> Press <kbd className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-xs">F</kbd> or double-click empty space</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">3D Controls</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><strong>Rotate:</strong> Click and drag</li>
                <li><strong>Pan:</strong> Right-click and drag</li>
                <li><strong>Zoom:</strong> Mouse wheel</li>
                <li><strong>Focus:</strong> Double-click a node</li>
                <li><strong>Reset view:</strong> Press <kbd className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-xs">R</kbd></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Filter className="w-6 h-6 text-[var(--amber-400)]" />
          Filtering & Grouping
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Quick Filters</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Use the filter bar to quickly show/hide elements:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Windows", "Linux", "Physical", "Virtual", "Active", "Inactive"].map((filter) => (
                <span
                  key={filter}
                  className="px-3 py-1 bg-[var(--bg-elevated)] rounded-full text-sm text-[var(--text-secondary)]"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Grouping Options</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Organize your diagram by grouping servers:
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• <strong>By Subnet:</strong> Group servers by network segment</li>
              <li>• <strong>By OS:</strong> Windows, Linux, other</li>
              <li>• <strong>By Application:</strong> Database, web, file servers</li>
              <li>• <strong>Custom Groups:</strong> Create your own groupings</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Search</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Press <kbd className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-xs">Ctrl+F</kbd> to open search.
              Search by hostname, IP address, installed software, or any other attribute.
              Matching nodes are highlighted in the diagram.
            </p>
          </div>
        </div>
      </section>

      {/* Layers */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-[var(--amber-400)]" />
          Diagram Layers
        </h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            Toggle visibility of different information layers:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
              <h4 className="font-medium mb-2">Infrastructure Layer</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Physical and virtual servers, network devices
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
              <h4 className="font-medium mb-2">Application Layer</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Installed applications and services
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
              <h4 className="font-medium mb-2">Connection Layer</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Network connections and data flows
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
              <h4 className="font-medium mb-2">Security Layer</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Vulnerabilities and certificates (Pro+)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exporting */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Download className="w-6 h-6 text-[var(--amber-400)]" />
          Exporting Diagrams
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Image Export</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Export your diagrams as images for documentation:
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• <strong>PNG:</strong> Raster format, good for presentations</li>
              <li>• <strong>SVG:</strong> Vector format, scales to any size</li>
              <li>• <strong>PDF:</strong> Print-ready with multiple pages</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Data Export</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Export underlying data for further analysis:
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• <strong>CSV:</strong> Simple spreadsheet format</li>
              <li>• <strong>Excel:</strong> Multiple sheets with relationships</li>
              <li>• <strong>JSON:</strong> For integrations and scripting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="font-display text-2xl mb-4">Tips & Tricks</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li>
              <strong>Save custom views:</strong> Create saved views for different audiences
              (executive summary vs. technical detail).
            </li>
            <li>
              <strong>Use color coding:</strong> Color nodes by OS, criticality, or custom tags
              for quick visual identification.
            </li>
            <li>
              <strong>Hide clutter:</strong> Use filters to focus on specific systems or
              connection types.
            </li>
            <li>
              <strong>Keyboard shortcuts:</strong> Press <kbd className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-xs">?</kbd> to
              see all available shortcuts.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
