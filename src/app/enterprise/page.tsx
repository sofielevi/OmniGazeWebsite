"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  Building2,
  Users,
  Server,
  Shield,
  Headphones,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const enterpriseFeatures = [
  {
    icon: Server,
    title: "Unlimited Infrastructure",
    description: "No limits on servers, applications, or data retention",
  },
  {
    icon: Users,
    title: "Unlimited Users",
    description: "Add your entire organization with role-based access control",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SSO/SAML, audit logs, and compliance certifications",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 priority support with dedicated success manager",
  },
];

const serverRanges = [
  "1-500 servers",
  "500-2,000 servers",
  "2,000-10,000 servers",
  "10,000+ servers",
];

export default function EnterprisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    serverRange: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // In production, this would POST to an API endpoint or CRM
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-[var(--success)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[var(--success)]" />
            </div>
            <h1 className="font-display text-4xl font-medium mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              We&apos;ve received your inquiry and our enterprise team will be in
              touch within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/docs">
                  Explore Documentation
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--amber-400)]/10 border border-[var(--amber-400)]/30 rounded-full text-[var(--amber-400)] text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Enterprise Solutions
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-medium mb-6">
              Built for Scale
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Comprehensive infrastructure visibility for large organizations.
              Custom deployment, dedicated support, and enterprise-grade security.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <div>
              <h2 className="font-display text-2xl font-medium mb-8">
                Enterprise Features
              </h2>
              <div className="grid gap-6">
                {enterpriseFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--amber-400)]/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-[var(--amber-400)]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional benefits */}
              <div className="mt-8 p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
                <h3 className="font-medium mb-4">Also Includes:</h3>
                <ul className="space-y-3">
                  {[
                    "Full pyramid access: Infrastructure to Strategy",
                    "Custom integrations and API access",
                    "On-premises deployment options",
                    "Volume licensing discounts",
                    "Professional services and training",
                    "SLA guarantees with 99.9% uptime",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h2 className="font-display text-2xl font-medium mb-2">
                Contact Our Sales Team
              </h2>
              <p className="text-[var(--text-secondary)] mb-8">
                Tell us about your organization and we&apos;ll create a custom
                solution for your needs.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium mb-2"
                    >
                      Company Name *
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Work Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@acme.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serverRange"
                    className="block text-sm font-medium mb-2"
                  >
                    Number of Servers *
                  </label>
                  <select
                    id="serverRange"
                    name="serverRange"
                    required
                    value={formData.serverRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--amber-400)] focus:border-transparent transition-all"
                  >
                    <option value="">Select range...</option>
                    {serverRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Tell us about your needs
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your infrastructure, current challenges, and what you're looking to achieve with OmniGaze..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Contact Sales
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-[var(--text-muted)] text-center">
                  By submitting, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--amber-400)] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . We&apos;ll respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
