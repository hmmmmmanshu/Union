import Image from "next/image";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

export function Features() {
  return (
    <section id="why-union" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Why Union?</SectionTag>
          <SectionHeading className="mt-4">
            Designed Around <em>Everyday People.</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-union-gray md:text-base">
            Empowering gig workers with better opportunities while delivering trusted, seamless
            services for modern homes.
          </p>
        </div>

        <div className="mt-12 w-full">
          <Image
            src="/images/features-section-grid.png"
            alt="Union app for workers and customers with verified opportunities, union support, flexible work, fair wages, trusted professionals, seamless booking, flexible scheduling, and safe payments"
            width={1152}
            height={548}
            className="h-auto w-full"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
        </div>
      </div>
    </section>
  );
}
