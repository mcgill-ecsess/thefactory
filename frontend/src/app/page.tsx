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
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Faq from "react-faq-component";
import { FAQDT } from "@/types/FAQDT";
import { useEffect, useState } from "react";
import { DoorFront } from "@mui/icons-material";

const faqStyles = {
  bgColor: "transparent",
  rowTitleColor: "rgba(255,255,255,0.85)",
  rowContentColor: "rgba(255,255,255,0.5)",
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
    <div className="relative home-ambient-base text-white overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 home-ambient-grid" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 home-ambient-light" />
      <div className="relative z-10">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-start px-6 md:px-8 mx-auto pt-24 pb-24 md:pb-32 overflow-hidden">
        {/* Grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(87,191,148,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(87,191,148,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full blur-3xl opacity-35"
          style={{ background: "radial-gradient(circle,#4ca981 0%,transparent 70%)" }}
        />
        {/* Green radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(ellipse,#57bf94 0%,transparent 70%)" }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto w-full">
          <div className="lg:col-span-7 z-10">
            <div className="mb-8">
              <span className="inline-block text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">
                McGill Engineering Makerspace
              </span>
              <div className="mt-2 h-0.5 w-20 bg-factory-green/70 rounded-sm" />
            </div>
            <h1 className="font-bold leading-[1.04] tracking-tighter mb-8 md:mb-10 text-white text-balance">
              <span className="text-5xl sm:text-6xl md:text-8xl">The Factory</span> <br />
              <span className="text-3xl sm:text-4xl md:text-7xl">McGill&apos;s <span className="text-factory-green">ECSE</span> Makerspace</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-xl mb-14 leading-relaxed">
              Build projects with tools, space, and a student community that ships. Made by students, for students. Find us in room 0080 of the Trottier Building.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6">
              <a
                href="https://factorydb.notkaramel.dev/dashboard/#/nc/form/b1f34cd8-bde2-490c-abd9-dadbada72737"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-factory-green hover:bg-factory-dark-green text-white px-6 md:px-10 py-3.5 md:py-5 rounded-xl font-bold tracking-wider uppercase text-sm md:text-base shadow-xl shadow-factory-green/10 hover:shadow-factory-green/20 transition-all"
              >
                Join the Network
              </a>
              <Link
                href="/our-lab"
                className="group flex items-center gap-3 md:gap-4 px-6 md:px-10 py-3.5 md:py-5 font-bold tracking-wider uppercase text-sm md:text-base text-white/70 hover:text-factory-green transition-colors"
              >
                View Equipment
                <span className="h-0.5 w-8 bg-factory-green/50 transition-all group-hover:w-12 group-hover:bg-factory-green" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -top-20 w-[120%] h-[120%] circuit-pattern pointer-events-none" />
            <img
              alt="The Factory Logo"
              className="w-full object-contain rounded-3xl scale-102 md:scale-110 md:-translate-x-8"
              src="/FactoryFriendlyRobot.JPG"
            />

            <div className="absolute -bottom-25 -left-25 glass-card p-8 rounded-xl border border-white/20 shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <Calendar className="text-factory-green size-12" />
                <div>
                  <p className="font-bold text-3xl text-white">10AM - 5PM </p>
                  <p className="text-xs uppercase tracking-widest text-white">Monday - Friday</p>
                  <p className="text-xs uppercase tracking-widest text-white">See our <Link href="/office-hours" className="text-factory-green hover:text-factory-dark-green transition-colors underline">Office Hours</Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is the Factory + Map ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block mb-4 text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">About</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 text-balance">
                What is the Factory?
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-factory-green via-[#7dd9b6] to-factory-dark-green rounded mb-6" />
              <p className="text-lg text-white/50 leading-relaxed">
                The Factory is a hardware design lab run by students, for students in
                Electrical, Computer, and Software Engineering at McGill University. Located
                in room 0080 of the Trottier Building, it&apos;s a dedicated space for developing
                personal projects, gaining hands-on experience, and collaborating with fellow students.
              </p>
            </div>

            {/* Map */}
            <div>
              <span className="inline-block mb-4 text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">Location</span>
              <h3 className="text-2xl font-bold text-white mb-2">Room 0080, Trottier Building</h3>
              <p className="text-sm text-white/40 mb-4">Shown in red on the map below</p>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <iframe
                  src="https://maps.mcgill.ca/?lat=45.50597407531836&lng=-73.57909006262219&z=16.25&cmp=1&txt=EN&id=Trottier"
                  width="100%"
                  height="360"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video + FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-4 text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">Discover</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
              See Us In Action
            </h2>
            <div className="w-14 h-1 bg-linear-to-r from-factory-green via-[#7dd9b6] to-factory-dark-green rounded mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Video */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/H-EEBm-rxqw?si=X_x06NfcIzyQxJbe"
                  title="The Factory video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="block w-full h-full"
                />
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h3>
              <div className="w-8 h-1 bg-linear-to-r from-factory-green to-factory-dark-green rounded mb-6" />
              <Faq data={faqs} styles={faqStyles} config={faqConfig} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">Free to Join</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">Membership</h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-linear-to-r from-factory-green via-[#7dd9b6] to-factory-dark-green rounded" />
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mt-4 mb-12 leading-relaxed">
            Becoming a member is <strong className="text-white/80">free</strong> and gives you
            access to a space dedicated to creativity and innovation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-12">
            {membershipBenefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3.5 p-4 rounded-xl border border-white/8 bg-white/4 hover:border-factory-green/40 hover:bg-factory-green/5 transition-all duration-200"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-factory-green/15 text-factory-green shrink-0">
                  <Icon size={18} />
                </div>
                <p className="text-white/80 text-sm font-medium">{text}</p>
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

      {/* ── Learn More ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-factory-green font-semibold tracking-[0.2em] uppercase text-sm">Explore</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white text-balance">Learn More</h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-linear-to-r from-factory-green via-[#7dd9b6] to-factory-dark-green rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {exploreLinks.map(({ href, icon: Icon, label, desc, isExternal }) => {
              const cls =
                "group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-factory-green/40 transition-all duration-200";
              const inner = (
                <>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-factory-green/15 text-factory-green group-hover:bg-factory-green group-hover:text-white transition-all duration-200">
                    <Icon size={22} />
                  </div>
                  <span className="text-white font-semibold">{label}</span>
                  <span className="text-white/40 text-xs text-center leading-relaxed">{desc}</span>
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

      </div>
    </div>
  );
}
