"use client";

import { cn } from "@/lib/utils";
import { Compass, Server, TrendingUp } from "lucide-react";

interface GravityWellProps {
  className?: string;
}

export function GravityWell({ className }: GravityWellProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3">
          Elevate Your Role
        </h3>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-5">
          Whether you lead with strategy or live in the infrastructure, OmniGaze
          gives you complete visibility—from servers to boardroom.
        </p>
        {/* Role tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Enterprise Architect", "Solutions Architect", "CTO", "CIO", "IT Director", "Infrastructure Lead"].map((role) => (
            <span
              key={role}
              className="px-3 py-1 text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-full text-[var(--text-secondary)]"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Gravity Well Visual */}
      <div className="relative h-[340px] md:h-[420px]">
        {/* SVG Field Lines - Background Layer */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 420"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for left field lines */}
            <linearGradient id="leftGradient" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#e8a030" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#e8a030" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e8a030" stopOpacity="1" />
            </linearGradient>

            {/* Gradient for right field lines */}
            <linearGradient id="rightGradient" x1="100%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#e8a030" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#e8a030" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e8a030" stopOpacity="1" />
            </linearGradient>

            {/* Glow filter for EIO */}
            <filter id="eioGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glow filter for center */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left field lines - multiple curves for depth, more visible */}
          <path
            d="M 60,360 Q 180,310 280,220 Q 360,140 400,70"
            stroke="url(#leftGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-field-line-left"
          />
          <path
            d="M 100,370 Q 200,300 300,210 Q 365,130 400,70"
            stroke="url(#leftGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-field-line-left"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M 140,380 Q 230,290 320,200 Q 370,120 400,70"
            stroke="url(#leftGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-field-line-left"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M 180,385 Q 260,280 340,190 Q 375,115 400,70"
            stroke="#e8a030"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Right field lines - multiple curves for depth, more visible */}
          <path
            d="M 740,360 Q 620,310 520,220 Q 440,140 400,70"
            stroke="url(#rightGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-field-line-right"
          />
          <path
            d="M 700,370 Q 600,300 500,210 Q 435,130 400,70"
            stroke="url(#rightGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-field-line-right"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M 660,380 Q 570,290 480,200 Q 430,120 400,70"
            stroke="url(#rightGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-field-line-right"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M 620,385 Q 540,280 460,190 Q 425,115 400,70"
            stroke="#e8a030"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Center gravitational glow */}
          <circle
            cx="400"
            cy="220"
            r="70"
            fill="#d4841c"
            opacity="0.1"
            filter="url(#glow)"
          />
          <circle
            cx="400"
            cy="220"
            r="40"
            fill="#e8a030"
            opacity="0.15"
          />

          {/* EIO glow at top */}
          <circle
            cx="400"
            cy="50"
            r="50"
            fill="#e8a030"
            opacity="0.2"
            filter="url(#eioGlow)"
          />

          {/* Upward pull indicator lines */}
          <path
            d="M 400,210 L 400,90"
            stroke="#e8a030"
            strokeWidth="2.5"
            strokeDasharray="8 5"
            opacity="0.7"
            className="animate-field-line-left"
          />
        </svg>

        {/* EIO Badge - Top Center - EMPHASIZED */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center">
            {/* Main badge - larger and more prominent */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-[var(--amber-400)]/20 rounded-2xl blur-xl animate-pulse-slow" />
              {/* Badge */}
              <div className="relative px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-600)] rounded-2xl shadow-2xl shadow-[var(--amber-500)]/50 text-center">
                <span className="block font-display text-xl md:text-2xl font-bold text-[var(--bg-deep)] tracking-wide">Complete Visibility</span>
                <span className="block text-xs text-[var(--bg-deep)]/70 mt-0.5">Servers → Strategy</span>
              </div>
            </div>
            {/* Role examples */}
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <span className="px-2 py-1 text-xs bg-[var(--bg-elevated)]/90 backdrop-blur-sm border border-[var(--amber-500)]/20 rounded-full text-[var(--amber-300)]">CIO</span>
              <span className="px-2 py-1 text-xs bg-[var(--bg-elevated)]/90 backdrop-blur-sm border border-[var(--amber-500)]/20 rounded-full text-[var(--amber-300)]">CTO</span>
              <span className="px-2 py-1 text-xs bg-[var(--bg-elevated)]/90 backdrop-blur-sm border border-[var(--amber-500)]/20 rounded-full text-[var(--amber-300)]">EA Lead</span>
            </div>
          </div>
        </div>

        {/* OmniGaze Logo - Center (The Gravity) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 mt-2">
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Pulsing ring */}
              <div className="absolute -inset-2 rounded-2xl bg-[var(--amber-400)]/20 animate-pulse-slow" />
              {/* Logo */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-600)] rounded-2xl flex items-center justify-center font-display text-2xl md:text-3xl font-semibold text-[var(--bg-deep)] shadow-xl shadow-[var(--amber-500)]/40">
                OG
              </div>
            </div>
            <span className="mt-3 text-xs uppercase tracking-widest text-[var(--amber-400)]">
              The Gravity
            </span>
          </div>
        </div>

        {/* Strategic Focus - Bottom Left */}
        <div className="absolute bottom-0 left-2 md:left-8 z-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
              <Compass className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-secondary)]" />
            </div>
            <span className="mt-2 text-sm font-medium text-[var(--text-primary)]">Strategic Focus</span>
            <span className="text-xs text-[var(--text-muted)] text-center md:text-left max-w-[140px]">
              Frameworks &amp; capabilities
            </span>
          </div>
        </div>

        {/* Technical Focus - Bottom Right */}
        <div className="absolute bottom-0 right-2 md:right-8 z-10">
          <div className="flex flex-col items-center md:items-end">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
              <Server className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-secondary)]" />
            </div>
            <span className="mt-2 text-sm font-medium text-[var(--text-primary)]">Technical Focus</span>
            <span className="text-xs text-[var(--text-muted)] text-center md:text-right max-w-[140px]">
              Infrastructure &amp; systems
            </span>
          </div>
        </div>

        {/* Directional arrows on field lines (showing flow toward center) */}
        <div className="absolute bottom-[120px] left-[20%] md:left-[24%] z-10 rotate-[-40deg]">
          <TrendingUp className="w-5 h-5 text-[var(--amber-400)] opacity-80" />
        </div>
        <div className="absolute bottom-[120px] right-[20%] md:right-[24%] z-10 rotate-[40deg] scale-x-[-1]">
          <TrendingUp className="w-5 h-5 text-[var(--amber-400)] opacity-80" />
        </div>
      </div>

      {/* What Each Type Gains */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Strategic roles gain */}
        <div className="p-5 bg-[var(--bg-elevated)]/50 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-5 h-5 text-[var(--amber-400)]" />
            <span className="font-medium text-[var(--text-primary)]">Strategic leaders gain</span>
          </div>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Infrastructure truth grounding your frameworks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Real data to prove architecture ROI</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Credibility with technical teams</span>
            </li>
          </ul>
        </div>

        {/* Technical roles gain */}
        <div className="p-5 bg-[var(--bg-elevated)]/50 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 mb-3">
            <Server className="w-5 h-5 text-[var(--amber-400)]" />
            <span className="font-medium text-[var(--text-primary)]">Technical leaders gain</span>
          </div>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Business language for your expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Visibility from servers to strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--amber-400)] mt-0.5">→</span>
              <span>Executive-ready insights from your data</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
