"use client";

import { useEffect, useState } from "react";
import { BiSolidUpArrow } from 'react-icons/bi';
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <a
      href="#"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center rounded-full text-white text-base cursor-pointer 
      shadow-lg no-underline z-50 transition-all duration-500 ease-in-out bg-[#fef200]
      ${isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        className="absolute top-0 left-0 -rotate-90"
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#fff"
          strokeWidth="4"
          fill="none"
          strokeDasharray={2 * Math.PI * 16}
          strokeDashoffset={2 * Math.PI * 16 * (1 - scrollProgress / 100)}
          style={{
            transition: "stroke-dashoffset 0.25s linear",
          }}
        />
      </svg>

      <span className="relative z-20">
        <BiSolidUpArrow />
      </span>
    </a>
  );
}
