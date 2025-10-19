"use client";

import Link from "next/link";

type TimelineItem = {
  title: string;
  subtitle: string;
  role: string;
  date: string;
  name: string;
  link: string;
};

const timelineData: TimelineItem[] = [
  {
    title: "Pioneering Fan Technology",
    subtitle: "We’re committed to delivering cutting-edge cooling solutions...",
    role: "Company CEO",
    date: "March 15, 2024",
    name: "Mr. Zeeshan",
    link: "",
  },
  {
    title: "Building Trust, One Home at a Time",
    subtitle: "Our customers are at the heart of everything we do...",
    role: "Company CEO",
    date: "January 28, 2024",
    name: "Mr. Zeeshan",
    link: "",
  },
  {
    title: "Building Trust, One Home at a Time",
    subtitle: "Our customers are at the heart of everything we do...",
    role: "Company CEO",
    date: "July 10, 2024",
    name: "Mr. Zeeshan",
    link: "",
  },
];

export default function Timeline() {
  return (
    <section className="max-w-6xl mx-auto py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 text-lg rounded-full bg-white/40 border border-white/40 text-black">
          Speaking Journey
        </span>
        <h2 className="text-2xl lg:text-4xl font-bold text-black mt-4">CEO’s Perspective</h2>
        <p className="text-black/80 text-sm  mt-2 max-w-2xl mx-auto">
          "An overview of my recent talks and workshops, where I’ve shared our
          vision for the future and the steps we’re taking to lead with purpose."
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2  top-0 h-full w-[2px] bg-neutral-700 -translate-x-1/2
  
        left-8
        md:left-1/2 md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-28">
          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex w-full ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Date above marker */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-10">
                  <span className="px-3 py-1 text-xs font-medium text-black bg-white border border-neutral-300 rounded-full shadow-sm whitespace-nowrap">
                    {item.date}
                  </span>
                </div>

                {/* Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-neutral-900  border-neutral-900"></div>

                {/* Card */}
                <div
                  className={`w-1/2 ${
                    isLeft ? "pr-3 flex justify-end" : "pl-3 flex justify-start"
                  }`}
                >
                  <Card {...item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button below timeline */}
      <div className="text-center mt-16">
        <Link
          href="" 
          className="inline-block px-6 py-3 bg-[var(--gold-btn-color)] text-black font-semibold rounded-lg shadow-md hover:bg-[var(--gold-btn-hover)] transition"
        >
          View All Events
        </Link>
      </div>
    </section>
  );
}


function Card({ title, subtitle, role, name, link }: TimelineItem) {
  return (
    <div
      className="bg-[var(--nav-color)] border border-white/50 p-6 rounded-xl shadow-md max-w-md
                 transition-transform duration-300 ease-in-out 
                 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-neutral-200">{subtitle}</p>
      <div className="flex flex-wrap items-center gap-3 mt-2">
        <span className="px-3 py-1.5 rounded-lg text-[var(--gold-btn-color)] font-medium  hover:text-[var(--gold-btn-hover)] transition-colors">
          {role}
        </span>
        <span className="px-3 py-1.5    text-white ">
          {name}
        </span>
      </div>
      <Link
        href={link}
        className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        Event details ↗
      </Link>
        </div>
      );
    }
