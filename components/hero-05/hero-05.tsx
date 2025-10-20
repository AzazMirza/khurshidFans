import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero05 = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="w-full grid lg:grid-cols-2 gap-12 pl-6 py-12 lg:py-0">

        <div className="my-auto ">
          {/* <Badge
            variant="secondary"
            className="rounded-full py-1 border-border"
            asChild
          >
            <Link href="#">
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge> */}
          <h1 className=" mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-[1.2]! tracking-tighter">
            Customized Shadcn UI Blocks & Components
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg ">
            Explore a collection of Shadcn UI blocks and components, ready to
            preview and copy. Streamline your development workflow with
            easy-to-implement examples.
          </p>
          <div className="mt-12 flex items-center gap-4 ">
            <Link href="#">
            <Button size="lg" className="rounded-full text-black cursor-pointer hover:bg-[var(--gold-btn-hover)] bg-[var(--gold-btn-color)]">
              Get Started <ArrowUpRight className="h-5! w-5!" />
            </Button>
            </Link>
            {/* </link> */}
            {/* <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5! w-5!" /> Watch Demo
            </Button> */}
          </div>
        </div>
        <img src="images/unicorn.png" alt="" className="w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen bg-[var(--nav-color)] rounded-xl lg:rounded-none" />
      </div>
    </div>
  );
};

export default Hero05;
