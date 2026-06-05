import { AvatarGrid } from "./ui/AvatarGrid";
import { HighlightText } from "./ui/HighlightText";
import { MissionPhone } from "./ui/MissionPhone";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";
import { StatCard } from "./ui/StatCard";

export function Mission() {
  return (
    <section id="mission" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Mission</SectionTag>
          <SectionHeading className="mt-4">
            Empowering Workers. <em>Supporting Homes</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-union-gray md:text-base">
            Union is building a trusted ecosystem where gig workers thrive and households get reliable everyday support.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Avatars card */}
          <StatCard
            className="md:col-span-1"
            title={
              <>
                Over 10,000+ <HighlightText>Verified Gig Workers</HighlightText>
              </>
            }
            description="Trusted professionals growing with Union every day."
          >
            <div className="mb-4 overflow-hidden rounded-2xl border border-[#e8e5e1] bg-[#efeeea] p-4">
              <AvatarGrid />
            </div>
            <div className="absolute right-5 bottom-5 flex h-8 w-8 items-center justify-center rounded-full bg-union-orange text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </StatCard>

          {/* Earnings card */}
          <StatCard
            className="md:col-span-1"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title={
              <>
                ₹50L+ Worker <HighlightText>Earnings Facilitated</HighlightText>
              </>
            }
            description="Helping gig workers earn consistently and grow confidently."
          />

          {/* Phone card - spans 2 rows */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] md:row-span-2">
            <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tl from-union-orange/20 to-transparent blur-2xl" />
            <div className="flex h-full flex-col p-6">
              <div className="flex flex-1 items-center justify-center py-4">
                <MissionPhone />
              </div>
              <div className="mt-auto">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-union-orange text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold leading-snug text-[#3d3428] md:text-2xl">
                  100% Verified <HighlightText>Opportunities</HighlightText>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#7a756d]">
                  Rated highly by households for reliable everyday support.
                </p>
              </div>
            </div>
          </div>

          {/* Cities card */}
          <StatCard
            className="md:col-span-1"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title={
              <>
                5+ Cities <HighlightText>Expanding Across</HighlightText>
              </>
            }
            description="Building stronger local communities through trusted services."
          />
        </div>
      </div>
    </section>
  );
}
