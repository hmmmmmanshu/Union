"use client";

import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

const faqs = [
  {
    question: "How do I join Union as a gig worker?",
    answer:
      "Sign up, select your category and services, complete verification, and start exploring opportunities.",
  },
  {
    question: "How are jobs assigned?",
    answer:
      "Jobs are matched based on your skills, location, and availability. You can browse and accept opportunities that fit your schedule.",
  },
  {
    question: "Can I work in different locations?",
    answer:
      "Yes, Union supports flexible work across multiple cities. Update your location preferences in the app to find nearby opportunities.",
  },
  {
    question: "How do I know if a job is verified?",
    answer:
      "All jobs on Union go through verification. Look for the verified badge on job listings and worker profiles for added trust.",
  },
  {
    question: "What is the Discuss section?",
    answer:
      "Discuss is Union's community forum where workers connect, share ideas, participate in polls, and stay updated with their local Union.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-gradient-to-b from-[#faf8f5] to-[#f5ebe3] py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>FAQs</SectionTag>
          <SectionHeading className="mt-4">
            Everything You <em>Need to Know.</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-union-gray md:text-base">
            Explore common questions about services, opportunities, safety, and the Union experience.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-[#e0d8d0]">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span
                    className={`h-8 w-1 shrink-0 rounded-full ${isOpen ? "bg-union-orange" : "bg-union-orange/30"}`}
                  />
                  <span
                    className={`flex-1 text-base font-medium ${isOpen ? "text-union-orange" : "text-[#3d3428]"}`}
                  >
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-union-orange transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="pb-5 pl-5 text-sm leading-relaxed text-[#7a756d]">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base text-[#3d3428]">
            Have something else on your mind?{" "}
            <em className="font-serif text-union-orange" style={{ fontStyle: "italic" }}>
              We&apos;re here to support your journey with Union.
            </em>
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-union-orange to-[#d45a32] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(232,115,74,0.4)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Talk to Us
          </button>
        </div>
      </div>
    </section>
  );
}
