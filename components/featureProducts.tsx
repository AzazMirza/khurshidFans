"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiltCard } from "./ui/TiltCard"; 
import { TextHoverEffect } from "@/components/ui/shadcn-io/text-hover-effect/page";
import { MouseBubble } from "@/components/ui/bubble-background/mouse-bubble";

export default function FeatureProducts() {
  
  const fans = [
    { title: "Ceiling Fans", img: "/images/kingmodel.png", link: "" },
    { title: "Pedestal Fans", img: "/images/Pedestal.png", link: "" },
    { title: "Exhaust Fans", img: "/images/exhaust.png", link: "" },
    { title: "Bracket Fans", img: "/images/bracket.png", link: "" },
  ];

  const astroFan = {
    title: "Astro Fans",
    img: "/images/kingmodel.png",
  };

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.querySelector("#feature-products-section");
    if (sectionElement) observer.observe(sectionElement);

    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
    };
  }, []);

  return ( 
    // <MouseBubble interactive>
      <section id="feature-products-section" className="relative z-10">
        <div
          className={`bg-[var(--nav-color)]/10 p-8 md:p-12 lg:p-16 transition-opacity duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl xs:text-3xl font-bold text-center mb-10">
            Feature Products
          </h2>

          {/* <div className="flex justify-center mb-10">
            <TextHoverEffect
              text="Khurshid Fans"
              duration={0.1}
              className="w-full max-w-2xl"
            />
          </div> */}

          <div className="flex flex-col md:flex-row lg:pl-24 lg:pr-16 gap-10 items-stretch">
            <div className="grid grid-cols-2 gap-6 flex-1">
              {fans.map((fan, idx) => (
                <TiltCard
                  key={idx}
                  className={`w-full transition-transform duration-100 ${
                    inView ? "transform-none" : "transform translate-y-10 opacity-0"
                  }`}
                >
                  <Card
                    className="flex bg-[var(--nav-color)]/40 flex-col items-center justify-center rounded-xl 
                              backdrop-blur-lg border border-white/50
                              shadow-[2px_3px_6px_var(--nav-color)]      
                              hover:shadow-[3px_4px_8px_var(--nav-color)]
                              transition h-40 sm:h-48 md:h-56 lg:h-64 z-0 cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center ">
                      <Image
                        src={fan.img}
                        alt={fan.title}
                        width={200}
                        height={200}
                        className="object-contain max-h-32 sm:max-h-40 md:max-h-48 lg:max-h-56"
                      />
                      <h3 className="text-lg text-center font-medium">{fan.title}</h3>
                    </CardContent>
                  </Card>
                </TiltCard>
              ))}
            </div>

            <div className="flex-1 flex">
              <TiltCard
                className={`w-full transition-transform duration-100 ${
                  inView ? "transform-none" : "transform translate-y-10 opacity-0"
                }`}
              >
                <Card
                  className="flex bg-[var(--nav-color)]/50 flex-col items-center justify-between rounded-xl 
                            backdrop-blur-lg border border-white/50
                            shadow-[2px_2px_6px_var(--nav-color)]
                            hover:shadow-[3px_4px_8px_var(--nav-color)]
                            transition w-full z-0 
                            h-auto min-h-[400px] sm:min-h-[453px] md:min-h-[500px] lg:min-h-[550px]"
                >
                  <CardContent className="flex flex-col items-center justify-center gap-4 pt-12 flex-1">
                    <Image
                      src={astroFan.img}
                      alt="Astro Fans"
                      width={250}
                      height={250}
                      className="object-contain max-h-60 sm:max-h-60 md:max-h-72 lg:max-h-80"
                    />
                    <h3 className="text-4xl font-bold">{astroFan.title}</h3>
                  </CardContent>

                  <CardFooter className="pb-8">
                    <Link href="">
                      <Button className="bg-[var(--gold-btn-color)] text-black active:bg-[var(--gold-btn-hover)] hover:bg-[var(--gold-btn-hover)] px-6 py-2 text-lg font-medium cursor-pointer">
                        BUY NOW
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    // </MouseBubble>
  );
}