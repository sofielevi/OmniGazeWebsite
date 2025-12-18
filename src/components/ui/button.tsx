"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-mono font-medium
      rounded-lg
      transition-all duration-300
      cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)]
        text-[var(--bg-deep)]
        glow-amber
        hover:translate-y-[-2px]
        hover:shadow-[0_8px_30px_var(--amber-glow)]
        active:translate-y-0
      `,
      secondary: `
        bg-[var(--bg-elevated)]
        text-[var(--text-primary)]
        border border-[var(--border-subtle)]
        hover:bg-[var(--bg-hover)]
        hover:border-[var(--border-warm)]
      `,
      ghost: `
        bg-transparent
        text-[var(--text-secondary)]
        hover:text-[var(--text-primary)]
        hover:bg-[var(--bg-elevated)]
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

// Link-styled button for Next.js Link compatibility
export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-mono font-medium
      rounded-lg
      transition-all duration-300
      cursor-pointer
      no-underline
    `;

    const variants = {
      primary: `
        bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)]
        text-[var(--bg-deep)]
        glow-amber
        hover:translate-y-[-2px]
        hover:shadow-[0_8px_30px_var(--amber-glow)]
        active:translate-y-0
      `,
      secondary: `
        bg-[var(--bg-elevated)]
        text-[var(--text-primary)]
        border border-[var(--border-subtle)]
        hover:bg-[var(--bg-hover)]
        hover:border-[var(--border-warm)]
      `,
      ghost: `
        bg-transparent
        text-[var(--text-secondary)]
        hover:text-[var(--text-primary)]
        hover:bg-[var(--bg-elevated)]
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <a
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
