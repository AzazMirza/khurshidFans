"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";

const faqData = {
  Account: [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll email you instructions to create a new password.",
    },
    {
      question: "Can I change my username?",
      answer:
        "Yes, you can change your username in your account settings. Note that if you change your username, your profile URL will also change.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "You can request account deletion from your account settings page. Please note this action is permanent and all your data will be removed.",
    },
  ],
  Billing: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, and PayPal.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds are available within 14 days of purchase if the service has not been used.",
    },
  ],
  Service: [
    {
      question: "How can I contact support?",
      answer:
        "You can contact us through the form on this page or email support@example.com.",
    },
    {
      question: "What are your support hours?",
      answer: "Our support team is available 24/7.",
    },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState<"Account" | "Billing" | "Service">(
    "Account"
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[var(--nav-color)] min-h-screen">
      {/* Navbar with same background */}
      <Navbar />

      {/* FAQ Section */}
      <section className="text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-20">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-100 mb-6">
              Find answers to common questions or contact our support team
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 ">
              {Object.keys(faqData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab as "Account" | "Billing" | "Service");
                    setOpenIndex(null);
                  }}
                  className={`px-4 py-1 rounded-md cursor-pointer ${
                    activeTab === tab
                      ? "bg-[var(--gold-btn-color)] text-black"
                      : "bg-white text-black hover:bg-[var(--gold-btn-hover)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqData[activeTab].map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between cursor-pointer items-center w-full text-left"
                  >
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <span className="">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <p className="text-gray-100 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm cursor-pointer">
              View all FAQs
            </button>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-accent shadow-none rounded-2xl p-6">
            <h3 className="text-xl font-semibold  text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-800 mb-6">
              Contact our support team and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full p-3 rounded-md text-black bg-white border border-gray-300 "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full p-3 rounded-md text-black bg-white border border-gray-300 "
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full p-3 rounded-md text-black bg-white border border-gray-300 "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Please provide as much detail as possible..."
                  rows={4}
                  className="w-full p-3 rounded-md text-black bg-white border border-gray-300 "
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[var(--nav-color)] text-white font-medium hover:bg-[var(--nav-color)]/80 cursor-pointer"
              >
                Send Message
              </button>
            </form>

            <p className="mt-6 text-gray-800 ">
              Prefer direct contact? Email us at{" "}
              <a
                href="mailto:khurshidfans@gmail.com"
                className="text-gray-900 font-medium hover:underline hover:text-[var(--nav-color)]"
              >
                khurshidfans@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
