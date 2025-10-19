"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative z-10 w-full px-4 lg:px-28">
      <div
        className="
          max-w-5xl mx-auto rounded-2xl bg-[var(--nav-color)]/80 
          p-6 flex flex-col md:flex-row items-center justify-between 
          shadow-lg border border-white 
          transition-transform duration-300 ease-out
          hover:scale-[1.03] hover:shadow-xl
        "
      >
        {/* Left Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-xl text-white font-bold">Cooling with Style</h2>
          <p className="text-white mt-1">
            Sleek design and powerful performance in every fan.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href=""
          className="
            mt-4 md:mt-0 inline-flex items-center gap-2 
            rounded-lg bg-[var(--gold-btn-color)] text-black font-medium 
            px-5 py-2 transition hover:bg-[var(--gold-btn-hover)]
          "
        >
          BUY NOW
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
