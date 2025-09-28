import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/shadcn-io/text-hover-effect/page";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";
import TypingText from "@/components/ui/shadcn-io/typing-text";


const Hero05 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-(--breakpoint-xl) w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          {/* <Badge
            variant="secondary"
            className="rounded-full py-1 border-border"
            asChild
          >
            <Link href="#">
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge> */}
          <h1 className="mt-6 max-w-[17ch] text-3xl md:text-4xl lg:text-5xl xl:text-[2.25rem] font-bold leading-snug tracking-tight">
            The Industry Leader in AC-DC Inverter Technology
            {/* <TypingText
                text={[""]}
                typingSpeed={30}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className=""
                textColors={['']}
                
              /> */}
            
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Khurshid Fans, pioneers of AC/DC hybrid technology in Pakistan,
            introduced the first inverter fan that  <span className="text-[var(--nav-color)] font-medium">saves up to 60%</span> electricity,
            runs at <span className="text-[var(--nav-color)] font-medium">low voltage (down to 90V)</span>, and delivers higher air performance. 
            <span className="text-[var(--nav-color)] font-medium">Built with 99.99% pure copper wire and German steel</span>, they ensure durability 
            and top efficiency—making Khurshid the leading brand in Pakistan.
          </p>
          <div className="mt-12 flex items-center gap-4 ">
            <Button size="lg" className=" rounded-full text-black bg-[var(--gold-btn-color)]/80 hover:bg-[var(--gold-btn-hover)]/80 cursor-pointer">
              Get Started <ArrowUpRight className="h-5! w-5!" />
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5! w-5!" /> Watch Demo
            </Button> */}
          </div>
          {/* <div className="flex justify-center mb-10">
                    <TextHoverEffect
                      text="Khurshid Fans"
                      duration={0.1}
                      className="w-full max-w-110"
                    />
                  </div> */}
        </div>
        <div className="w-full aspect-video lg:aspect-auto lg:w-[800px] lg:h-screen bg-[var(--nav-color)] rounded-xl lg:rounded-none">

          <img 
            src="images/kingmodel.png" 
            alt="king model image" 
            className="w-full h-full object-cover rounded-xl lg:rounded-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero05;
