"use client";

import {
  ArrowLeftRight,
  CalendarRange,
  CircuitBoard,
  Clock,
  HandHelping,
  Mail,
  Microchip,
  Presentation,
  School,
  UsersRound,
  Warehouse,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Faq from "react-faq-component";
import { FAQDT } from "@/types/FAQDT";
import { useEffect, useState } from "react";

const faqStyles = {
  bgColor: "transparent",
  rowTitleColor: "white",
  rowContentColor: "rgba(255,255,255,0.75)",
  arrowColor: "#57bf94",
  rowTitleTextSize: "1rem",
};

const faqConfig = {};

const membershipBenefits = [
  { icon: Clock, text: "Access to the lab during opening hours" },
  { icon: CircuitBoard, text: "Use of advanced equipment in the lab" },
  { icon: Microchip, text: "Access to components for personal projects" },
  { icon: ArrowLeftRight, text: "Rental of equipment for personal projects" },
  { icon: UsersRound, text: "Collaboration with other members" },
  { icon: HandHelping, text: "Support from experienced managers" },
  { icon: School, text: "Training on lab safety and equipment use" },
  { icon: Presentation, text: "Participation in workshops" },
];

const exploreLinks = [
  { href: "/office-hours", icon: CalendarRange, label: "Office Hours", desc: "See when managers are available" },
  { href: "/workshops", icon: Presentation, label: "Workshops", desc: "Browse upcoming and past sessions" },
  { href: "/our-lab", icon: Warehouse, label: "Our Lab", desc: "Explore the equipment we offer" },
  { href: "mailto:thefactory@mcgilleus.ca", icon: Mail, label: "Contact Us", desc: "Get in touch with the team", isExternal: true },
];

export default function Home() {
  const [faqs, setFaqs] = useState<{ rows: { title: string; content: string }[] }>({ rows: [] });

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    fetch("https://factorystrapi.mcgilleus.ca/api/faqs", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setFaqs({
          rows: data.data.map((faq: FAQDT) => ({
            title: faq.attributes.title,
            content: faq.attributes.content,
          })),
        });
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-72px)] bg-factory-black flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(87,191,148,0),transparent)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <img
            src="/FactoryBoxWithText.png"
            alt="The Factory"
            className="w-xs max-w-screen drop-shadow-2xl"
          />
          <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed">
            A hardware design lab run by students, for students at McGill University.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://factorydb.notkaramel.dev/dashboard/#/nc/form/b1f34cd8-bde2-490c-abd9-dadbada72737"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-factory-green hover:bg-factory-dark-green text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-factory-green/30 active:scale-95"
            >
              Become a Member
            </a>
            <Link
              href="/our-lab"
              className="border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium px-7 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 active:scale-95"
            >
              Explore the Lab
            </Link>
          </div>
        </div>
      </section>

      {/* ── What is the Factory + Map ── */}
      <section className="bg-factory-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What is the Factory?</h2>
            <div className="section-divider" />
            <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              The Factory is a hardware design lab run by students, for students in
              Electrical, Computer, and Software Engineering at McGill University. Located
              in room 0080 of the Trottier Building, it&apos;s a dedicated space for developing
              personal projects, gaining hands-on experience, and collaborating with fellow students.
            </p>
          </div>

          <div className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-2">Where is the Factory?</h3>
            <div className="section-divider" />
            <p className="text-white/55 text-sm mb-6">
              Room 0080, Trottier Building (shown in red below)
            </p>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://maps.mcgill.ca/?lat=45.50597407531836&lng=-73.57909006262219&z=16.25&cmp=1&txt=EN&id=Trottier"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Video + FAQ ── */}
      <section className="bg-factory-black text-white py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Video */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4 text-white/90">See us in action</h3>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/H-EEBm-rxqw?si=X_x06NfcIzyQxJbe"
                  title="The Factory video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="block"
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4 text-white/90">FAQ</h3>
              <div className="section-divider !mx-0 !mb-5" />
              <Faq data={faqs} styles={faqStyles} config={faqConfig} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Membership</h2>
          <div className="section-divider !bg-gradient-to-r from-factory-green to-factory-dark-green" />
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Becoming a member is <strong className="text-gray-700">free</strong> and gives you
            access to a space dedicated to creativity and innovation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-12">
            {membershipBenefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3.5 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-factory-green/30 hover:bg-factory-green/5 transition-all duration-200"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-factory-green/10 text-factory-green shrink-0">
                  <Icon size={18} />
                </div>
                <p className="text-gray-700 text-sm font-medium">{text}</p>
              </div>
            ))}
          </div>

          <a
            href="https://factorydb.notkaramel.dev/dashboard/#/nc/form/b1f34cd8-bde2-490c-abd9-dadbada72737"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-factory-green hover:bg-factory-dark-green text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-factory-green/30 active:scale-95 tracking-wide"
          >
            BECOME A MEMBER
            <ChevronRight size={18} />
          </a>
        </div>
      </section>

      {/* ── Explore ── (desktop only, matches original) */}
      <section className="hidden lg:block bg-factory-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Learn More</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {exploreLinks.map(({ href, icon: Icon, label, desc, isExternal }) => {
              const cls = "group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-factory-green/40 transition-all duration-200";
              const inner = (
                <>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-factory-green/15 text-factory-green group-hover:bg-factory-green group-hover:text-white transition-all duration-200">
                    <Icon size={22} />
                  </div>
                  <span className="text-base font-semibold">{label}</span>
                  <span className="text-white/45 text-xs text-center leading-relaxed">{desc}</span>
                </>
              );
              return isExternal ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={label} href={href} className={cls}>{inner}</Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
