import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

const brands = [
  { name: "Business Insider", width: "w-28" },
  { name: "The Hindu", width: "w-20" },
  { name: "Moneycontrol", width: "w-28" },
  { name: "Morning Brew", width: "w-24" },
  { name: "Forbes", width: "w-16" },
];

export function Recognition() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Recognition</SectionTag>
          <SectionHeading className="mt-4">
            Trusted by Communities, <em>Highlighted by Brands</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-union-gray md:text-base">
            Building meaningful impact through reliable services, trusted professionals, and community support.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`${brand.width} text-center text-base font-bold tracking-tight text-[#3d3428]/25 grayscale transition-all hover:text-[#3d3428]/40 md:text-lg`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
