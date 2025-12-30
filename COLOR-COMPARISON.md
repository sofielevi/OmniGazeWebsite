# OmniGaze Color Palette Comparison

<style>
.color-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 20px 0; }
.color-section { padding: 16px; border-radius: 8px; background: #1a1a1a; }
.color-section h3 { margin-top: 0; color: #fff; border-bottom: 1px solid #333; padding-bottom: 8px; }
.color-row { display: flex; align-items: center; margin: 12px 0; gap: 12px; }
.color-swatch { width: 48px; height: 48px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
.color-info { flex: 1; }
.color-name { font-weight: 600; color: #f0f0f0; font-size: 14px; }
.color-hex { font-family: monospace; color: #888; font-size: 13px; }
.color-role { color: #666; font-size: 12px; }
.divider { border: 0; border-top: 2px solid #333; margin: 32px 0; }
.full-width { grid-column: 1 / -1; }
</style>

<div class="color-grid">

<div class="color-section">
<h3>Original Colors (Pre-Sofie)</h3>

<div class="color-row">
<div class="color-swatch" style="background: #0d0f12;"></div>
<div class="color-info">
<div class="color-name">Background Deep</div>
<div class="color-hex">#0d0f12</div>
<div class="color-role">Dark Blue-Gray</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #14171c;"></div>
<div class="color-info">
<div class="color-name">Background Card</div>
<div class="color-hex">#14171c</div>
<div class="color-role">Blue-Gray</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #1a1e25;"></div>
<div class="color-info">
<div class="color-name">Background Elevated</div>
<div class="color-hex">#1a1e25</div>
<div class="color-role">Light Blue-Gray</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #e8a030;"></div>
<div class="color-info">
<div class="color-name">Amber 400</div>
<div class="color-hex">#e8a030</div>
<div class="color-role">Primary Accent</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #d4841c;"></div>
<div class="color-info">
<div class="color-name">Amber 500</div>
<div class="color-hex">#d4841c</div>
<div class="color-role">Secondary Accent</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #f0ede8;"></div>
<div class="color-info">
<div class="color-name">Text Primary</div>
<div class="color-hex">#f0ede8</div>
<div class="color-role">Main text color</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #9a958d;"></div>
<div class="color-info">
<div class="color-name">Text Secondary</div>
<div class="color-hex">#9a958d</div>
<div class="color-role">Muted text</div>
</div>
</div>

</div>

<div class="color-section">
<h3>Sofie's Suggested Colors</h3>

<div class="color-row">
<div class="color-swatch" style="background: #1A0E1F;"></div>
<div class="color-info">
<div class="color-name">Dark Purple</div>
<div class="color-hex">#1A0E1F</div>
<div class="color-role">Background</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #241825;"></div>
<div class="color-info">
<div class="color-name">Muted Purple</div>
<div class="color-hex">#241825</div>
<div class="color-role">Cards</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #2B1533;"></div>
<div class="color-info">
<div class="color-name">Deep Purple</div>
<div class="color-hex">#2B1533</div>
<div class="color-role">Elevated surfaces</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #C06A9A;"></div>
<div class="color-info">
<div class="color-name">Pink</div>
<div class="color-hex">#C06A9A</div>
<div class="color-role">Accent / Hover</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #B0588A;"></div>
<div class="color-info">
<div class="color-name">Rose</div>
<div class="color-hex">#B0588A</div>
<div class="color-role">Accent Alt</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #9F4F7A;"></div>
<div class="color-info">
<div class="color-name">Dark Rose</div>
<div class="color-hex">#9F4F7A</div>
<div class="color-role">Accent Dark</div>
</div>
</div>

</div>

</div>

<hr class="divider">

<div class="color-section full-width" style="background: #12091a;">
<h3>Current Implementation (Hybrid)</h3>
<p style="color: #888; margin-bottom: 16px;">Purple backgrounds from Sofie + Amber accents kept for brand recognition</p>

<div class="color-grid" style="margin: 0;">

<div>
<h4 style="color: #e8a030; margin: 0 0 12px 0;">Backgrounds</h4>

<div class="color-row">
<div class="color-swatch" style="background: #1A0E1F;"></div>
<div class="color-info">
<div class="color-name">--bg-deep</div>
<div class="color-hex">#1A0E1F</div>
<div class="color-role">Sofie's Dark Purple</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #241825;"></div>
<div class="color-info">
<div class="color-name">--bg-card</div>
<div class="color-hex">#241825</div>
<div class="color-role">Sofie's Muted Purple</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #2B1533;"></div>
<div class="color-info">
<div class="color-name">--bg-elevated</div>
<div class="color-hex">#2B1533</div>
<div class="color-role">Sofie's Deep Purple</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #3a2040;"></div>
<div class="color-info">
<div class="color-name">--bg-hover</div>
<div class="color-hex">#3a2040</div>
<div class="color-role">Derived hover state</div>
</div>
</div>

</div>

<div>
<h4 style="color: #e8a030; margin: 0 0 12px 0;">Accents</h4>

<div class="color-row">
<div class="color-swatch" style="background: #e8a030;"></div>
<div class="color-info">
<div class="color-name">--amber-400</div>
<div class="color-hex">#e8a030</div>
<div class="color-role">Primary (kept for brand)</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #d4841c;"></div>
<div class="color-info">
<div class="color-name">--amber-500</div>
<div class="color-hex">#d4841c</div>
<div class="color-role">Dark amber</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #B0588A;"></div>
<div class="color-info">
<div class="color-name">--rose-accent</div>
<div class="color-hex">#B0588A</div>
<div class="color-role">Sofie's Rose (secondary)</div>
</div>
</div>

<div class="color-row">
<div class="color-swatch" style="background: #C06A9A;"></div>
<div class="color-info">
<div class="color-name">--rose-light</div>
<div class="color-hex">#C06A9A</div>
<div class="color-role">Sofie's Pink (hover)</div>
</div>
</div>

</div>

</div>

</div>

<hr class="divider">

## Summary

| Role | Original | Sofie's | Current |
|------|----------|---------|---------|
| **Background Deep** | `#0d0f12` | `#1A0E1F` | `#1A0E1F` |
| **Background Card** | `#14171c` | `#241825` | `#241825` |
| **Background Elevated** | `#1a1e25` | `#2B1533` | `#2B1533` |
| **Primary Accent** | `#e8a030` | `#C06A9A` | `#e8a030` |
| **Secondary Accent** | `#d4841c` | `#B0588A` | `#B0588A` |

**Key Decisions:**
- Backgrounds: Adopted Sofie's warmer purple tones
- Primary Accent: Kept amber for brand recognition ("Warm Technical")
- Secondary Accent: Added Sofie's rose/pink as complementary color
