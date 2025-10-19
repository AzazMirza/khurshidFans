"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // shadcn utils, or just use template strings

export function ActiveLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "link-underline font-medium transition-colors",
        isActive
          ? "text-[var(--gold-btn-color)]" 
          : "hover:text-[var(--gold-btn-color)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[230px] p-4">

        <nav className="flex flex-col space-y-3">
          <Link href="/" className=" pt-5 link-underline font-medium"> Home </Link>
          <Link href="#" className="link-underline font-medium"> Blogs</Link>
        
          <Accordion type="single" collapsible>
                <AccordionItem value="store">
                  <AccordionTrigger className=" hover:text-[var(--nav-color)] font-medium">
                    Store
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-4">
                    <Link href="#" className="link-underline"> Products </Link>
                    <Link href="#" className="link-underline"> View Cart </Link>
                    <Link href="#" className="link-underline"> Check Out </Link>
                    <Link href="#" className="link-underline"> Profile </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

          <Accordion type="single" collapsible>
                <AccordionItem value="support">
                  <AccordionTrigger className=" hover:text-[var(--nav-color)] font-medium">
                    Support
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-4">
                    <Link href="#contact" className="link-underline"> Contact Us </Link>
                    <Link href="/stillFaq" className="link-underline"> FAQ </Link>
                    <Link href="/aboutus" className="link-underline"> About Us </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

          <Accordion type="single" collapsible>
                <AccordionItem value="Customer Service">
                  <AccordionTrigger className=" hover:text-[var(--nav-color)] font-medium">
                    Customer Service
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-4">
                    <Link href="#" className="link-underline"> Complaints </Link>
                    <Link href="#" className="link-underline"> FAQ </Link>
                    <Link href="#" className="link-underline"> About Us </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

          <Link href="#" className="link-underline font-medium" > Export Queries </Link>
        </nav>
        <div className="mt-8 flex flex-col space-y-3">
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-300 hover:bg-[var(--nav-color)] dark:border-gray-700 dark:hover:bg-gray-800 
                       shadow-md hover:shadow-lg transition-shadow duration-300">
            Sign In
          </Button>
          <Button className="w-full rounded-full hover:text-[var(--nav-color)]">
            Sign Up
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
