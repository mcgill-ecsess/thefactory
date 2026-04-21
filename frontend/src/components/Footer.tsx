"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.facebook.com/ecsessfactory",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/thefactory_mcgill/",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/the-factory-mcgill/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:thefactory@mcgilleus.ca",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="bg-on-surface border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/logo/factory_logo_inline_white.png"
              alt="The Factory"
              className="h-9 object-contain opacity-90"
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              McGill's student-run hardware lab for project building, workshops, and hands-on learning.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/Ecsess-Logo.png"
                alt="ECSESS"
                className="h-9 object-contain opacity-80"
              />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-factory-green mb-4">
              Explore
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/" className="text-white/65 hover:text-white transition-colors">Home</Link>
              <Link href="/office-hours" className="text-white/65 hover:text-white transition-colors">Office Hours</Link>
              <Link href="/workshops" className="text-white/65 hover:text-white transition-colors">Workshops</Link>
              <Link href="/our-lab" className="text-white/65 hover:text-white transition-colors">Our Lab</Link>
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-factory-green mt-8 mb-4">
              Administration
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/add-member" className="text-white/45 hover:text-white transition-colors">Membership Form</Link>
              <Link href="/login" className="text-white/45 hover:text-white transition-colors">Manager Login</Link>
              <Link href="/inventory" className="text-white/45 hover:text-white transition-colors">Inventory</Link>
              {/* <Link href="/members" className="text-white/45 hover:text-white transition-colors">Members</Link> */}
            </div>
          </div>

          {/* Contact + socials */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-factory-green mb-4">
              Contact
            </h3>
            <a
              href="mailto:thefactory@mcgilleus.ca"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Mail size={15} />
              thefactory@mcgilleus.ca
            </a>
            <div className="flex gap-3 mt-5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/6 hover:bg-factory-green text-white transition-all duration-200"
                >
                  <Icon size={17} strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-white/40 text-xs sm:text-sm">© 2026 ECSESS The Factory @ McGill University</p>
          <p className="text-white/30 text-xs sm:text-sm">View our <Link href="https://github.com/mcgill-ecsess/thefactory" className="text-white/40 hover:text-white transition-colors">source code</Link> on GitHub. Built with love {"<3"}</p>
        </div>
      </div>
    </footer>
  );
}
