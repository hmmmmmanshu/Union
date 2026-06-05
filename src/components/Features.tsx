import Image from "next/image";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

const leftFeatures = [
  { icon: "✓", title: "Verified Opportunities", desc: "Discover jobs for your skills." },
  { icon: "👥", title: "Union Support", desc: "Empowering gig workers." },
  { icon: "💼", title: "Flexible Work Options", desc: "Select your schedule." },
  { icon: "💰", title: "Fair Wages", desc: "Reliable income." },
];

const rightFeatures = [
  { icon: "🛡", title: "Trusted Professionals", desc: "All workers are verified." },
  { icon: "▦", title: "Seamless Booking", desc: "Manage services easily." },
  { icon: "🕐", title: "Flexible Scheduling", desc: "Book services anytime." },
  { icon: "✓", title: "Safe & Transparent", desc: "Safe payments." },
];

function FeaturePill({
  title,
  desc,
  icon,
  className = "",
}: {
  title: string;
  desc: string;
  icon: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#ebe8e4] bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-union-orange/10 text-xs text-union-orange">
          {icon}
        </span>
        <div>
          <div className="text-xs font-semibold text-[#3d3428]">{title}</div>
          <div className="text-[10px] text-[#7a756d]">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Features</SectionTag>
          <SectionHeading className="mt-4">
            Designed Around <em>Everyday People.</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-union-gray md:text-base">
            Empowering gig workers with better opportunities while delivering trusted, seamless services for modern homes.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Left pills - desktop */}
          <div className="absolute top-0 left-0 z-10 hidden w-44 flex-col gap-3 md:flex">
            {leftFeatures.map((f, i) => (
              <FeaturePill key={f.title} {...f} className={i % 2 === 1 ? "ml-4" : ""} />
            ))}
          </div>

          {/* Right pills - desktop */}
          <div className="absolute top-0 right-0 z-10 hidden w-44 flex-col gap-3 md:flex">
            {rightFeatures.map((f, i) => (
              <FeaturePill key={f.title} {...f} className={i % 2 === 1 ? "mr-4" : ""} />
            ))}
          </div>

          {/* Phone mockups */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="card-shadow w-[42%] max-w-[200px] overflow-hidden rounded-[2rem] border-[3px] border-union-orange bg-union-orange p-[3px]">
              <div className="overflow-hidden rounded-[1.6rem] bg-white">
                <Image
                  src="/images/phone-feature-left.png"
                  alt="Union worker app"
                  width={200}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="card-shadow w-[42%] max-w-[200px] overflow-hidden rounded-[2rem] border-[3px] border-union-orange bg-union-orange p-[3px]">
              <div className="overflow-hidden rounded-[1.6rem] bg-white">
                <Image
                  src="/images/phone-feature-right.png"
                  alt="Union customer app"
                  width={200}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          {/* Mobile pills */}
          <div className="mt-8 grid grid-cols-2 gap-2 md:hidden">
            {[...leftFeatures, ...rightFeatures].map((f) => (
              <FeaturePill key={f.title} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
