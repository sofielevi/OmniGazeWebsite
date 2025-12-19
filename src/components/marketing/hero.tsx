"use client";

import { ChevronRight, Play } from "lucide-react";
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
          <div className="relative flex items-center justify-center" style={{ width: '90vw', height: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <video
              autoPlay
              controls
              className="max-w-full max-h-full rounded-xl shadow-2xl"
              style={{ objectFit: 'contain' }}
            >
              <source src="/videos/hero-animation.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-0 right-0 text-white/70 hover:text-white transition-colors p-2"
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
