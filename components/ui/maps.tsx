'use client';

import { useEffect, useRef, useState } from "react";

export default function MapEmbed() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stop observing after load
        }
      },
      { rootMargin: "200px" } // load a bit before it comes into view
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-xl shadow-lg overflow-hidden"
    >
      {isVisible ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.866235498725!2d74.08948517572217!3d32.52971937376804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b3a6e405615%3A0x33983c89be3f46b1!2sKhurshid%20Fans!5e0!3m2!1sen!2s!4v1758432216617!5m2!1sen!2s"
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">Loading map…</span>
        </div>
      )}
    </div>
  );
}
