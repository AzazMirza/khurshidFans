"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { BubbleBackground } from "./ui/bubble-background/bubble-background";

const Contact02Page = () => (
  // <BubbleBackground interactive>
    <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center py-16 {/*bg-[var(--nav-color)]/10*/}">
      <div className="w-full  max-w-[var(--breakpoint-xl)] mx-auto px-6 xl:px-0">
        {/* <b className="text-black uppercase font-semibold text-sm">Contact Us</b> */}
        <h2 className="mt-3 text-3xl justify-center text-center md:text-4xl xs:text-3xl font-bold tracking-tight text-black">
          Chat with our friendly team!
        </h2>
        <p className="mt-3 text-base justify-center text-center sm:text-lg text-black">
          We&apos;d love to hear from you. Please fill out this form or shoot us an email.
        </p>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {[
              {
                icon: <MailIcon className="w-6 h-6" />,
                title: "Email",
                desc: "Our friendly team is here to help.",
                link: "mailto:KhurshidFans@gmail.com",
                linkText: "KhurshidFans@gmail.com",
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Live chat",
                desc: "Our friendly team is here to help.",
                link: "#",
                linkText: "Start new chat",
              },
              {
                icon: <MapPinIcon className="w-6 h-6" />,
                title: "Office",
                desc: "Come say hello at our office HQ.",
                link: "https://www.google.com/maps/place/Khurshid+Fans/@32.530334,74.090236,16z/data=!4m6!3m5!1s0x391f1b3a6e405615:0x33983c89be3f46b1!8m2!3d32.5297194!4d74.0920601!16s%2Fg%2F1tfw1f8g?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D",
                linkText: (
                  <>
                    SGS Electrical Company, GT Rd, Gujrat, 50700, Pakistan <br /> 
                  </>
                ),
              },
              {
                icon: <PhoneIcon className="w-6 h-6" />,
                title: "Phone",
                desc: "Sat-Thurs from 9am to 5pm.",
                link: "tel:+923010000000",
                linkText: "+92 (301) 000-0000",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 
                  bg-[var(--nav-color)]/60 dark:bg-black/20 
                  border border-white dark:border-white/10 
                  rounded-2xl 
                  backdrop-blur-lg 
                  shadow-md 
                  transition 
                  hover:shadow-xl hover:scale-[1.02] 
                  active:scale-[0.98] active:shadow-lg 
                  duration-300 ease-in-out"
              >
                <div className="h-12 w-12 flex items-center justify-center  dark:bg-primary/20 text-white rounded-full transition-transform duration-300 hover:scale-110 hover:animate-bounce active:scale-110 active:animate-bounce focus-visible:animate-bounce">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-semibold text-2xl text-white">{item.title}</h3>
                <p className="my-2.5 text-white">{item.desc}</p>
                <Link
                  className="font-medium text-white hover:text-[var(--gold-btn-color)]"
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                >
                  {item.linkText}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="bg-accent shadow-none py-0">
            <CardContent className="p-6 md:p-8">
              <form>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      placeholder="First name"
                      id="firstName"
                      className="mt-2 bg-white h-10 shadow-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      placeholder="Last name"
                      id="lastName"
                      className="mt-2 bg-white h-10 shadow-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="mt-2 bg-white h-10 shadow-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      className="mt-2 bg-white shadow-none"
                      rows={6}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox id="acceptTerms" className="bg-background" />
                    <Label htmlFor="acceptTerms" className="gap-0">
                      You agree to our
                      <Link href="#" className="underline ml-1 hover:text-[var(--nav-color)]">
                        terms and conditions
                      </Link>
                      <span>.</span>
                    </Label>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-[var(--nav-color)]/90 hover:bg-[var(--nav-color)]/100 active:scale-[0.98] transition-transform duration-200" size="lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  // </BubbleBackground>
);

export default Contact02Page;

