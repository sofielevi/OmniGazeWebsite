"use client";

import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsSrc = "/videos/hls/master.m3u8";

    if (Hls.isSupported()) {
      // Use hls.js for browsers without native HLS support
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        startLevel: 0, // Start with lowest quality for fast initial load
      });
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay blocked - that's ok for background video
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari has native HLS support
      video.src = hlsSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // VideoObject schema for SEO
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "OmniGaze Infrastructure Discovery",
    description: "See how OmniGaze auto-discovers your IT infrastructure and visualizes dependencies from servers to strategy.",
    thumbnailUrl: "https://omnigaze.com/videos/hero-poster.jpg",
    uploadDate: "2024-01-01",
    contentUrl: "https://omnigaze.com/videos/hls/master.m3u8",
    embedUrl: "https://omnigaze.com",
    duration: "PT8S",
    publisher: {
      "@type": "Organization",
      name: "OmniGaze",
      logo: {
        "@type": "ImageObject",
        url: "https://omnigaze.com/logo.svg",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20">
      {/* VideoObject Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Background Video with HLS Adaptive Streaming */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
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
          Auto-discover your infrastructure. See how it connects. Understand what it means for your business.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <ButtonLink href="/register" variant="primary" size="lg">
            Start Free
            <ChevronRight size={18} />
          </ButtonLink>
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
