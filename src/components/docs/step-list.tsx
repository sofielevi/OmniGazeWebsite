import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

interface StepListProps {
  steps: Step[];
  className?: string;
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={cn("space-y-6 my-6", className)}>
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-400)]/10 text-[var(--amber-400)] flex items-center justify-center font-mono text-sm font-medium">
            {index + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="font-display font-medium text-[var(--text-primary)] mb-1">
              {step.title}
            </h4>
            {step.description && (
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {step.description}
              </p>
            )}
            {step.children}
          </div>
        </li>
      ))}
    </ol>
  );
}

// Alternative: Individual Step component for more flexibility
interface StepProps {
  number: number;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Step({ number, title, description, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-400)]/10 text-[var(--amber-400)] flex items-center justify-center font-mono text-sm font-medium">
        {number}
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="font-display font-medium text-[var(--text-primary)] mb-1">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
