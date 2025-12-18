import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="container mx-auto px-6 max-w-7xl">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-16",
      align === "center" && "text-center max-w-2xl mx-auto",
      className
    )}>
      {label && (
        <div className="text-xs uppercase tracking-widest text-[var(--amber-400)] mb-4">
          {label}
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
        {title}
      </h2>
      {description && (
        <p className="font-display font-light text-lg text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}
