import { Loader2 } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)] flex items-center justify-center font-display font-bold text-[var(--bg-deep)] text-xl mx-auto mb-4 animate-pulse">
          OG
        </div>
        <Loader2 className="w-6 h-6 animate-spin text-[var(--amber-400)] mx-auto" />
      </div>
    </div>
  );
}
