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
  Bolt,
} from "lucide-react";
import Link from "next/link";
import Faq from "react-faq-component";
import { FAQDT } from "@/types/FAQDT";
import { useEffect, useState } from "react";

const faqStyles = {
  bgColor: "transparent",
  rowTitleColor: "#091d2e",
  rowContentColor: "#4e6073",
  arrowColor: "#006c4c",
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
      <section className="bg-surface relative min-h-screen flex items-start px-8 mx-auto pt-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto">
            <div className="lg:col-span-7 z-10">
              <span className="inline-block mb-8 font-label text-primary font-semibold tracking-[0.2em] uppercase text-sm">McGill Engineering Makerspace</span>
              <h1 className="font-headline text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-12 text-on-surface">
                The Factory - McGill&apos;s <span className="text-primary-container">ECSE</span> Makerspace.
              </h1>
              <p className="font-body text-xl text-secondary max-w-xl mb-16 leading-relaxed">
                Where ideas come to life. Access industrial-grade tools and a community of innovators in the heart of McGill University.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="cursor-pointer bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-lg font-headline text-lg font-bold tracking-wider uppercase shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all">
                  Join the Network
                </button>
                <button className="cursor-pointer group flex items-center gap-4 px-10 py-5 font-headline text-lg font-bold tracking-wider uppercase text-on-surface hover:text-primary transition-colors">
                  View Equipment
                  <span className="h-0.5 w-8 bg-primary-container transition-all group-hover:w-12"></span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-20 w-[120%] h-[120%] circuit-pattern pointer-events-none"></div>
                <img
                  alt="The Factory Logo"
                  className="w-full object-contain rounded-3xl scale-110 -translate-x-8"
                  src="/FactoryFriendlyRobot.JPG"
                />
              

              <div className="absolute -bottom-25 -left-25 glass-card p-8 rounded-xl border border-white/20 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <Bolt className="text-primary w-8 h-8" />
                  <div>
                    <p className="font-headline font-bold text-2xl">10:00-17:00</p>
                    <p className="font-label text-xs uppercase tracking-widest text-secondary">Member Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ── What is the Factory + Map ── */}
      <section className="bg-surface-low py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block mb-4 font-label text-primary font-semibold tracking-[0.2em] uppercase text-sm">About</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-5">
                What is the Factory?
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-container rounded mb-6" />
              <p className="font-body text-lg text-secondary leading-relaxed">
                The Factory is a hardware design lab run by students, for students in
                Electrical, Computer, and Software Engineering at McGill University. Located
                in room 0080 of the Trottier Building, it&apos;s a dedicated space for developing
                personal projects, gaining hands-on experience, and collaborating with fellow students.
              </p>
            </div>

            {/* Map */}
            <div>
              <span className="inline-block mb-4 font-label text-primary font-semibold tracking-[0.2em] uppercase text-sm">Location</span>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Room 0080, Trottier Building</h3>
              <p className="font-body text-sm text-secondary mb-4">Shown in red on the map below</p>
              <div className="rounded-2xl overflow-hidden border border-surface-highest shadow-lg">
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
      <section className="bg-surface py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-4 font-label text-primary font-semibold tracking-[0.2em] uppercase text-sm">Discover</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
              See Us In Action
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-container rounded mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Video */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-surface-highest shadow-lg aspect-video">
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
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Frequently Asked Questions</h3>
              <div className="w-8 h-1 bg-gradient-to-r from-primary to-primary-container rounded mb-6" />
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

      {/* ── Learn More ── (desktop only, matches original) */}
      <section className="hidden lg:block bg-surface text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">Learn More</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {exploreLinks.map(({ href, icon: Icon, label, desc, isExternal }) => {
              const cls = "group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-factory-green/40 transition-all duration-200";
              const inner = (
                <>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-factory-green/15 text-factory-green group-hover:bg-factory-green group-hover:text-white transition-all duration-200">
                    <Icon size={22} />
                  </div>
                  <span className="text-black font-semibold">{label}</span>
                  <span className="text-black text-xs text-center leading-relaxed">{desc}</span>
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
