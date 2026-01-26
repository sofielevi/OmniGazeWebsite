import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "The Team - Meet the People Behind OmniGaze",
  description:
    "Meet the OmniGaze leadership team. Experienced professionals in IT infrastructure, enterprise architecture, and software development.",
  openGraph: {
    title: "The Team - OmniGaze",
    description: "Meet the people building the future of infrastructure discovery.",
    url: "https://omnigaze.com/team",
  },
  alternates: {
    canonical: "https://omnigaze.com/team",
  },
};

const team = [
  {
    name: "Morten Vinther",
    role: "CEO",
    image: "/images/team/MortenVinther.png",
    bio: "CEO with 20+ years in IT and software development, specializing in scalable, enterprise technology platforms.",
    linkedin: "https://www.linkedin.com/in/morten-vinther-4297965/",
  },
  {
    name: "Sofie Levi Pourhadi",
    role: "CRO",
    image: "/images/team/SofieLeviPourhadi.png",
    bio: "CRO and Co-Founder, with expertise in scaling software businesses, strategy, and sustainable growth.",
    linkedin: "https://www.linkedin.com/in/sofie-levi/",
  },
  {
    name: "John Fabienke",
    role: "CTO",
    image: "/images/team/JohnFabienke.jpg",
    bio: "CTO, with strong tech leadership background. 25+ years of architecture and product development background.",
    linkedin: "https://www.linkedin.com/in/john-vindahl-fabienke-a96a171/",
  },
  {
    name: "John Webb",
    role: "Technical Sales & Solutions Engineer",
    image: "/images/team/JohnWebb.png",
    bio: "Technical Sales & Solutions Engineer, with a background in software engineering and management.",
    linkedin: "https://www.linkedin.com/in/john-christopher-webb/",
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-[var(--amber-400)]/10 text-[var(--amber-400)] rounded-full mb-6">
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                The Team
              </h1>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                We&apos;re a team of experienced professionals passionate about bridging
                the gap between IT infrastructure and business strategy.
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>

            {/* Mission Statement */}
            <div className="mt-20 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl mb-4">Our Mission</h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
                To provide organizations with complete visibility into their IT landscape,
                enabling them to make informed decisions that align technology with business goals.
                From servers to strategy, we bridge the gap.
              </p>
            </div>

            {/* Values */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              <ValueCard
                title="Transparency"
                description="We believe in clear, honest communication with our customers and within our team."
              />
              <ValueCard
                title="Innovation"
                description="Continuously pushing boundaries to deliver cutting-edge solutions for complex problems."
              />
              <ValueCard
                title="Customer Focus"
                description="Every feature we build starts with understanding our customers' real-world challenges."
              />
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function TeamCard({ member }: { member: typeof team[0] }) {
  return (
    <div className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 hover:border-[var(--border-warm)] transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-28 h-28 mx-auto sm:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-600)] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <Image
              src={member.image}
              alt={member.name}
              width={112}
              height={112}
              className="relative rounded-2xl object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
            <h3 className="font-display text-xl md:text-2xl">{member.name}</h3>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="w-5 h-5 fill-current" />
              </a>
            )}
          </div>
          <div className="text-[var(--amber-400)] text-sm font-medium mb-3">
            {member.role}
          </div>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-xl p-6 text-center">
      <h3 className="font-display text-lg mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
