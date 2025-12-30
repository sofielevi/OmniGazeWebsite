"use client";

import { cn } from "@/lib/utils";

interface CustomerLogosProps {
  className?: string;
}

const customers = [
  {
    name: "Danske Fragtmænd",
    logo: "/images/customers/danske-fragtmaend.svg",
  },
  {
    name: "GN Store Nord",
    logo: "/images/customers/gn-store-nord.png",
  },
  {
    name: "Billund Airport",
    logo: "/images/customers/billund-airport.png",
  },
  {
    name: "Wrist Ship Supply",
    logo: "/images/customers/wrist-ship-supply.jpg",
  },
];

export function CustomerLogos({ className }: CustomerLogosProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-2">
          Trusted by enterprises
        </p>
      </div>

      {/* Logo Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {customers.map((customer) => (
          <div
            key={customer.name}
            className="h-12 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customer.logo}
              alt={customer.name}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
