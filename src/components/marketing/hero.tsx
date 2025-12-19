"use client";

import { ChevronRight, Play, Shield, Server, CloudOff, Lock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideo(false);
    };
    if (showVideo) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showVideo]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero-network.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]" />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />

        {/* Glow orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-float"
          style={{
            background: "radial-gradient(circle, var(--amber-500) 0%, transparent 70%)",
            top: "-200px",
            right: "-100px",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 animate-float"
          style={{
            background: "radial-gradient(circle, var(--amber-600) 0%, transparent 70%)",
            bottom: "20%",
            left: "-100px",
            animationDelay: "-7s",
          }}
        />
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <video
              autoPlay
              loop
              controls
              className="w-full rounded-xl shadow-2xl"
            >
              <source src="/videos/hero-animation.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-warm)] rounded-full text-xs text-[var(--amber-300)] mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 bg-[var(--amber-400)] rounded-full animate-blink" />
          Now with 3D Architecture Visualization
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          See Your Infrastructure
          <br />
          <span className="gradient-text">Clearly</span>
        </h1>

        {/* Subtitle */}
        <p className="font-display font-light text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Auto-discover your servers, map dependencies, and bridge the gap between
          IT operations and enterprise architecture—all in one platform your team will actually enjoy using.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <ButtonLink href="/register" variant="primary" size="lg">
            Start Free
            <ChevronRight size={18} />
          </ButtonLink>
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center justify-center gap-2 font-medium transition-all bg-transparent border border-[var(--border-subtle)] hover:border-[var(--border-warm)] text-[var(--text-primary)] rounded-lg px-8 py-4 text-base"
          >
            <Play size={18} />
            Watch Demo
          </button>
        </div>

        {/* Data Sovereignty Section */}
        <div className="mb-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <div className="relative p-6 md:p-8 bg-gradient-to-r from-[var(--bg-elevated)]/80 to-[var(--bg-card)]/60 border border-[var(--border-warm)]/40 rounded-2xl backdrop-blur-sm">
            {/* Subtle glow accent */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--amber-500)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              {/* Icon & Headline */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--amber-500)]/20 to-[var(--amber-600)]/10 border border-[var(--amber-500)]/30 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[var(--amber-400)]" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                    Your Data Stays Put.
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Discovery data never leaves your environment
                  </p>
                </div>
              </div>

              {/* Visual Diagram */}
              <div className="flex-1 flex items-center justify-center lg:justify-start gap-3 py-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-deep)]/60 rounded-lg border border-[var(--border-subtle)]">
                  <Server className="w-4 h-4 text-[var(--amber-400)]" />
                  <span className="text-sm font-medium">Your Data</span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-px bg-gradient-to-r from-[var(--amber-500)] to-[var(--amber-400)]" />
                  <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-[var(--amber-400)] -ml-1" />
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--amber-500)]/10 rounded-lg border border-[var(--amber-500)]/30">
                  <Lock className="w-4 h-4 text-[var(--amber-400)]" />
                  <span className="text-sm font-medium text-[var(--amber-300)]">Stays Here</span>
                </div>

                <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-2 bg-[var(--bg-deep)]/40 rounded-lg border border-[var(--border-subtle)]/50 opacity-50">
                  <CloudOff className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)] line-through">Uploads</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-deep)]/60 rounded-full text-xs font-medium border border-[var(--border-subtle)] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Self-Hosted
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-deep)]/60 rounded-full text-xs font-medium border border-[var(--border-subtle)] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Air-Gap Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 pt-10 border-t border-[var(--border-subtle)] animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="font-display text-3xl md:text-4xl font-semibold text-[var(--amber-300)]">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
