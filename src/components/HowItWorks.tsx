import { AppStoreButtons } from "./ui/AppStoreButtons";
import { HighlightText } from "./ui/HighlightText";
import { PhonePairCard } from "./ui/PhonePairCard";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

const steps = [
  {
    phones: ["/images/phone-onboarding-1.png", "/images/phone-onboarding-2.png"] as [string, string],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: (
      <>
        Built for <HighlightText>Gig Workers</HighlightText>
      </>
    ),
    description: "From onboarding to opportunities, Union supports your growth every step of the way.",
  },
  {
    phones: ["/images/phone-jobs-1.png", "/images/phone-jobs-2.png"] as [string, string],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: (
      <>
        Find Work <HighlightText>That Fits You</HighlightText>
      </>
    ),
    description: "Browse nearby jobs, check details, and accept opportunities with confidence.",
  },
  {
    phones: ["/images/phone-community-1.png", "/images/phone-community-2.png"] as [string, string],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: (
      <>
        Your Voice, <HighlightText>Your Community</HighlightText>
      </>
    ),
    description: "Engage with your Union, share ideas, and stay connected through community discussions and polls.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#faf8f5] py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>How It Works</SectionTag>
          <SectionHeading className="mt-4">
            Simple. Trusted. <em>Seamless.</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#7a756d] md:text-base">
            A seamless experience connecting households with trusted gig professionals through one intelligent platform.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <div key={step.phones[0]} className="flex flex-col items-center text-center">
              <PhonePairCard phones={step.phones} />

              <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[10px] bg-union-orange text-white shadow-[0_4px_16px_rgba(232,115,74,0.45)]">
                {step.icon}
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#3d3428] md:text-xl">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-[#7a756d]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <AppStoreButtons className="mt-12 justify-center" />
      </div>
    </section>
  );
}
