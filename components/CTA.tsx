"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { BubbleBackground } from "@/components/ui/bubble-background/bubble-background";

export default function CTABanner() {
  return (
    // <BubbleBackground interactive>
      <div className="relative z-10 px-6 py-20 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="relative w-full text-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 lg:px-14 
                     bg-[var(--nav-color)]/70 dark:bg-black/20 backdrop-blur-lg shadow-xl border border-white"
        >
          {/* Heading + Text */}
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <h2 className="text-2xl xs:text-3xl text-white lg:text-4xl font-bold">
              Ready to Elevate Your Experience?
            </h2>
            <p className="mt-3 text-white/90 text-xl">
              Experience powerful cooling and energy efficiency — explore our
              latest fan collection today.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[var(--gold-btn-color)] text-black hover:bg-[var(--gold-btn-hover)] cursor-pointer"
            >
              Shop Now <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    // </BubbleBackground>
  );
}
