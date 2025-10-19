"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/ui/nav-menu";
import { NavigationSheet } from "@/components/ui/navigation-sheet";

const Navbar04Page = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-transparent">
      <nav
        className={`fixed top-4 inset-x-4 mx-auto rounded-full border border-white 
          transition-all duration-500 ease-in-out z-50
          
          ${scrolled
            ? "h-16 max-w-[900px] bg-[var(--nav-color)]/80 border-white/30 shadow-xl backdrop-blur-md"
            : "h-13 max-w-[var(--breakpoint-xl)] bg-[var(--nav-color)] border-transparent shadow-none backdrop-blur-0"
          }`}
      >
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <a href="/">
            <img src="images/khurshid fans logo.png" alt="Khurshid Fans Logo" className="h-8 sm:h-10 md:h-12 pl-3 sm:pl-5 w-auto object-contain"/>
          </a>
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Link href="/login">
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full cursor-pointer"
            >
              Sign In
            </Button>
            </Link>
            <Link href="/signup">
            <Button variant="cta" className=" rounded-full cursor-pointer">
              Sign Up
            </Button>
            </Link>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar04Page;
