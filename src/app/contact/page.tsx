"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Check, Send, Calendar, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-[var(--omnigaze-gold)]/10 text-[var(--omnigaze-gold)] rounded-full mb-6">
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
              Let&apos;s Talk
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Get pricing for your team or schedule a personalized demo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <QuoteForm />
            <DemoCard />
          </div>

          {/* Trust footer */}
          <p className="text-center text-sm text-[var(--text-muted)] mt-12">
            We respond within 1 business day. Standard pricing available for all tiers.
          </p>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function QuoteForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = (formData.get("fullName") as string).trim();
    const nameParts = fullName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          firstName,
          lastName,
          email: formData.get("email"),
          company: formData.get("company"),
          phone: formData.get("phone") || undefined,
          serverCountRange: formData.get("serverCount") || undefined,
          message: formData.get("message") || undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-[var(--success)]" />
        </div>
        <h3 className="font-display text-2xl mb-2">Request Received</h3>
        <p className="text-[var(--text-secondary)]">
          We&apos;ll get back to you within 1 business day with pricing details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--omnigaze-gold)]/10 flex items-center justify-center">
          <Send className="w-5 h-5 text-[var(--omnigaze-gold)]" />
        </div>
        <div>
          <h2 className="font-display text-xl">Get a Quote</h2>
          <p className="text-sm text-[var(--text-muted)]">Receive our standard price list</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full Name" name="fullName" required placeholder="Jane Smith" />
        <FormField label="Business Email" name="email" type="email" required placeholder="jane@company.com" />
        <FormField label="Company" name="company" required placeholder="Acme Corp" />
        <FormField label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Server Count
          </label>
          <select
            name="serverCount"
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--omnigaze-gold)] transition-colors"
          >
            <option value="">Select a range</option>
            <option value="1-50">1-50 servers</option>
            <option value="51-200">51-200 servers</option>
            <option value="201-1000">201-1,000 servers</option>
            <option value="1001-5000">1,001-5,000 servers</option>
            <option value="5000+">5,000+ servers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Tell us about your needs
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="What are you looking to accomplish?"
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--omnigaze-gold)] transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">{errorMsg}</p>
        )}

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get a Quote"
          )}
        </Button>
      </form>
    </div>
  );
}

function DemoCard() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--omni-violet)]/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-[var(--omni-violet)]" />
        </div>
        <div>
          <h2 className="font-display text-xl">Book a Demo</h2>
          <p className="text-sm text-[var(--text-muted)]">30-minute personalized walkthrough</p>
        </div>
      </div>

      <p className="text-[var(--text-secondary)] mb-6">
        See OmniGaze in action. We&apos;ll walk through discovery, visualization, and how
        OmniGaze maps your infrastructure to business value.
      </p>

      <ul className="space-y-3 mb-8 text-sm text-[var(--text-secondary)]">
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
          Live infrastructure discovery demo
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
          3D visualization walkthrough
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
          Q&A with our team
        </li>
      </ul>

      <div className="mt-auto">
        <a
          href="https://cal.eu/sofielevi/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full font-mono font-medium rounded-lg transition-all duration-300 cursor-pointer px-5 py-2.5 text-sm bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-warm)]"
        >
          <Calendar className="w-4 h-4" />
          Book a Demo
        </a>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
        {label}{required && <span className="text-[var(--omnigaze-gold)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--omnigaze-gold)] transition-colors"
      />
    </div>
  );
}
