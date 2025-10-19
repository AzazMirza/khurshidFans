"use client";

import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import { BubbleBackground } from "@/components/ui/bubble-background/bubble-background";
import Footer04Page from "@/components/footer-04";

export default function CompanyValues() {
  return (

    <BubbleBackground interactive>
      <Navbar />
        <div className="relative z-10  bg-[var(--nav-color)]/10">
          {/* Main Section */}
          <section className="max-w-6xl mx-auto py-16 px-6 text-center">
            {/* Quote Section */}
            <div className="mt-6 mb-12">
              <div className="text-6xl text-gray-800 mb-6">❝</div>
              <p className="text-xl md:text-2xl text-black font-medium max-w-3xl mx-auto">
                "The goal isn’t to build a website, an app, or a company. The goal
                is to change the world by giving people tools that make their lives
                better and make them better people."
              </p>
              <div className="mt-6 flex flex-row justify-center items-center">
                <Image
                  src="/images/kingmodel.png" 
                  alt="CEO"
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                /><div className="text-left p-3">
                <h4 className="   font-bold text-black">Mr. Zeeshan</h4>
                <p className="text-gray-800 text-sm">Founder & Creative Director</p>
                </div>
              </div>
            </div>

            <div className="  mx-auto p-8 bg-[var(--nav-color)]/60 dark:bg-black/20 
                          border-white dark:border-white/10 rounded-2xl 
                            backdrop-blur-lg shadow-md transition 
                            hover:shadow-xl hover:scale-[1.02] 
                            active:scale-[0.98] active:shadow-lg 
                            duration-300 ease-in-out"
              >
              <h2 className="text-2xl font-bold text-white mb-2">Our Mission</h2>
              <p className="text-gray-100 max-w-2xl mx-auto">
                To create digital experiences that elevate brands, empower users,
                and inspire meaningful connections through thoughtful design and
                innovative technology.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-6 p-8 text-black">Guiding Values</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left ">
                <ValueCard
                  title="Purpose-Driven"
                  description="We believe in creating work that serves a meaningful purpose and delivers real value."
                />
                <ValueCard
                  title="Continuous Growth"
                  description="We embrace learning and evolution as essential parts of our journey."
                />
                <ValueCard
                  title="Client Partnership"
                  description="We see our clients as partners in a shared mission, not just customers."
                />
                <ValueCard
                  title="Creative Excellence"
                  description="We push creative boundaries while maintaining the highest standards of quality."
                />
                <ValueCard
                  title="Human-Centered"
                  description="We design for people first, putting human needs at the center of everything we create."
                />
                <ValueCard
                  title="Sustainable Innovation"
                  description="We create solutions that are not only innovative today but sustainable for tomorrow’s challenges."
                />
              </div>
            </div>
          </section>
        </div>
        <Footer04Page/>
    </BubbleBackground>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
<div className="p-6 bg-[var(--nav-color)]/60 dark:bg-black/20 
                   border-white dark:border-white/10 
                  border-l-6
                  rounded-2xl 
                  backdrop-blur-lg 
                  shadow-md 
                  transition 
                  hover:shadow-xl hover:scale-[1.02] 
                  active:scale-[0.98] active:shadow-lg 
                  duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white text-sm">{description}</p>
    </div>
  );
}

