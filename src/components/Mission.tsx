import Image from "next/image";
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

        <div className="mt-12 w-full">
          <Image
            src="/images/mission-bento-grid.png"
            alt="Over 10,000 verified gig workers, ₹50L+ earnings facilitated, 5+ cities expanding, and 100% verified opportunities"
            width={1200}
            height={500}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
