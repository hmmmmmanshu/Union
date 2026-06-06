import { AppStoreButtons } from "./ui/AppStoreButtons";

export function Hero() {
  return (
    <section className="gradient-hero pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="section-container text-center">
        <h1 className="mx-auto max-w-4xl text-[clamp(36px,6vw,64px)] font-semibold leading-[1.1] tracking-tight text-union-dark">
          Your Daily Household Services, Powered by{" "}
          <em className="font-serif italic text-union-orange">Trusted Gig Workers</em>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-union-gray md:text-lg">
          From plumbing to deliveries — find reliable, verified professionals for every
          household need. Union connects you with skilled gig workers you can trust.
        </p>

        <AppStoreButtons className="mt-8 justify-center" />

        <div className="relative mx-auto mt-10 w-full pt-2 md:mt-14">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2">
            <div className="mx-auto h-72 w-72 rounded-full bg-gradient-to-br from-union-orange/30 via-union-orange-light/20 to-transparent blur-3xl md:h-[420px] md:w-[420px]" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-team.png"
            alt="Union workers team"
            width={1152}
            height={465}
            decoding="async"
            className="mx-auto block w-full"
            style={{ height: "auto", maxHeight: "none" }}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
