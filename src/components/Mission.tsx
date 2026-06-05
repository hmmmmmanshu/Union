import Image from "next/image";
import { HighlightText } from "./ui/HighlightText";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

export function Mission() {
  return (
    <section id="mission" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Our Impact</SectionTag>
          <SectionHeading className="mt-4">
            Empowering Workers. <em>Supporting Homes</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-union-gray md:text-base">
            Union is building a trusted ecosystem where gig workers grow and households access
            reliable services with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Workers card */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] p-6 md:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-[#e8e5e1] bg-[#efeeea]">
              <Image
                src="/images/mission-card-workers.png"
                alt="Verified gig workers"
                width={340}
                height={200}
                className="h-auto w-full"
              />
            </div>
            <div className="absolute right-5 bottom-5 flex h-8 w-8 items-center justify-center rounded-full bg-union-orange text-white shadow-[0_4px_12px_rgba(232,115,74,0.45)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold leading-snug text-[#3d3428] md:text-2xl">
              Over 10,000+ <HighlightText>Verified Gig Workers</HighlightText>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7a756d]">
              Trusted professionals growing with Union every day.
            </p>
          </div>

          {/* Earnings card */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] md:col-span-1">
            <Image
              src="/images/mission-card-earnings.png"
              alt="₹50L+ Worker Earnings Facilitated"
              width={370}
              height={250}
              className="h-auto w-full"
            />
          </div>

          {/* Phone card — spans 2 rows */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] md:row-span-2">
            <Image
              src="/images/mission-card-phone.png"
              alt="Union app job opportunities"
              width={400}
              height={520}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Cities card — spans 2 columns */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] md:col-span-2">
            <Image
              src="/images/mission-card-cities-wide.png"
              alt="5+ Cities Expanding Across"
              width={760}
              height={280}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
