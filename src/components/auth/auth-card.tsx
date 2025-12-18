"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description?: string;
  step?: { current: number; total: number };
}

export function AuthCard({ children, title, description, step }: AuthCardProps) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-xl">
      {/* Progress Indicator */}
      {step && (
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: step.total }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step.current
                  ? "bg-[var(--amber-400)]"
                  : "bg-[var(--bg-elevated)]"
              }`}
            />
          ))}
          <span className="text-xs text-[var(--text-muted)] ml-2">
            Step {step.current} of {step.total}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--text-secondary)]">{description}</p>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
      <p className="text-sm text-red-400">{message}</p>
    </div>
  );
}

interface AuthSuccessProps {
  message: string;
}

export function AuthSuccess({ message }: AuthSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg px-4 py-3 mb-6">
      <p className="text-sm text-[var(--success)]">{message}</p>
    </div>
  );
}
