import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";
import { ServiceCard } from "./ui/ServiceCard";

const services = [
  {
    title: "Plumbing Services",
    description:
      "Reliable plumbing support for repairs, fittings, leak fixes, and everyday household maintenance.",
    character: "/images/char-plumber.png",
  },
  {
    title: "Cab Driver Services",
    description:
      "Safe and dependable driver services for local travel, pickups, and daily commute needs.",
    character: "/images/char-cab.png",
  },
  {
    title: "Maid Services",
    description:
      "Everyday household assistance designed around comfort, cleanliness, and reliable support.",
    character: "/images/char-maid.png",
  },
  {
    title: "Auto Driver Services",
    description:
      "Verified auto drivers available for quick local transportation and daily travel support.",
    character: "/images/char-auto.png",
  },
  {
    title: "Construction Worker Services",
    description:
      "Skilled workers for home projects, repairs, maintenance, and construction support.",
    character: "/images/char-construction.png",
  },
  {
    title: "Delivery Partner Services",
    description:
      "Reliable delivery support for groceries, parcels, documents, and everyday essentials.",
    character: "/images/char-delivery.png",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#faf8f5] py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Services</SectionTag>
          <SectionHeading className="mt-4">
            Trusted Services for <em>Everyday Living</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-union-gray md:text-base">
            Discover trusted professionals for all your needs, delivering quality services right on time.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#f08050] to-[#e06030] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(232,115,74,0.45)] transition-transform hover:scale-[1.02]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Discover all Services
          </button>
        </div>
      </div>
    </section>
  );
}
