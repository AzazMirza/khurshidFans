import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { BubbleBackground } from "@/components/ui/bubble-background/bubble-background";
import Banner from "@/components/ui/banner";

const faq = [
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@example.com or through the live chat on our website. We're available 24/7 to assist you.",
  },
];

export default function FAQ() {
  return (
    // <BubbleBackground interactive>
      <div id="faq" className="relative z-10 w-full  backdrop-blur-lg ">
        <div className="max-w-screen-xl mx-auto py-8 xs:py-16 text-center lg:text-left px-4 lg:px-28">
          <h2 className="text-center text-2xl xs:text-3xl lg:text-4xl !leading-[1.15] font-bold tracking-tighter text-black">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-gray-800 text-xl">
            Quick answers to common questions about our products and services.
          </p>

          <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
            <Accordion
              type="single"
              collapsible
              className="mt-8 space-y-4 md:columns-2 gap-4 text-white"
            >
              {faq.map(({ question, answer }, index) => (
                <AccordionItem
                  key={question}
                  value={`question-${index}`}
                  className="bg-[var(--nav-color)]/80 py-1 px-4 rounded-xl border border-white "
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex cursor-pointer flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all",
                        "text-start text-lg text-white relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
                        "after:bg-[var(--gold-btn-color)] after:transition-all after:duration-300 hover:after:w-full hover:text-[var(--gold-btn-color)] active:text-[var(--gold-btn-color)]"
                      )}
                    >
                      {question}
                      <PlusIcon className="h-5 w-5 shrink-0 text-white transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-[16px] text-white/90">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
          {/* <Banner/> */}
      </div>
    // </BubbleBackground>
  );
}
