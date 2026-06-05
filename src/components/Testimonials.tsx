import { HighlightText } from "./ui/HighlightText";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionTag } from "./ui/SectionTag";

const testimonials = [
  {
    title: <>Seamless <HighlightText>Everyday Support</HighlightText></>,
    quote:
      "Union helped us find reliable household support without the usual stress. The experience feels smooth, trustworthy, and thoughtfully designed.",
    name: "Lalit Gautam",
    role: "Founder @ Sensegrass",
    tall: true,
  },
  {
    title: <>Empowering <HighlightText>Everyday Work</HighlightText></>,
    quote:
      "Union fosters a more human approach to services, empowering workers to grow confidently.",
    name: "Aritra Banerjee",
    role: "UX Designer @ Sensegrass",
    tall: false,
  },
  {
    title: <>Designed for <HighlightText>Modern Living</HighlightText></>,
    quote:
      "From scheduling to support, the ecosystem feels incredibly polished. Union genuinely simplifies modern living.",
    name: "Ayashi Das Majumder",
    role: "COO @ Sensegrass",
    tall: false,
  },
  {
    title: <>Trust <HighlightText>Comes First</HighlightText></>,
    quote:
      "Finding verified professionals is now effortless and feels modern, transparent, and reliable.",
    name: "Prajjwal Shukla",
    role: "Trainer @ MPSeDC",
    tall: false,
  },
  {
    title: <>Reliable Everyday <HighlightText>Support</HighlightText></>,
    quote:
      "Union makes everyday service management feel effortless while maintaining a high level of trust and professionalism.",
    name: "Rahul Gundala",
    role: "VP Technology @ Union",
    tall: false,
  },
  {
    title: <>A Smarter <HighlightText>Service Experience</HighlightText></>,
    quote:
      "The platform makes managing everyday services incredibly simple. From bookings to updates, everything feels seamless.",
    name: "Meenakshy Panicker",
    role: "CEO @ Instafarm",
    tall: true,
  },
  {
    title: <>Smooth Service, <HighlightText>Experience</HighlightText></>,
    quote:
      "The experience feels incredibly smooth — from discovering services to managing everything through the app.",
    name: "Himanshu Goswami",
    role: "Developer @ Union",
    tall: false,
  },
];

function TestimonialCard({
  title,
  quote,
  name,
  role,
  tall = false,
}: {
  title: React.ReactNode;
  quote: string;
  name: string;
  role: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`card-shadow flex flex-col rounded-[24px] border border-[#ebe8e4] bg-gradient-to-br from-[#faf8f5] to-[#fff0e8] p-6 ${tall ? "md:row-span-2" : ""}`}
    >
      <h3 className="text-base font-bold leading-snug text-[#3d3428]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#7a756d]">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-[#ebe8e4]/60 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-union-orange/15 text-sm font-bold text-union-orange">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-union-orange">{name}</div>
          <div className="text-xs text-[#7a756d]">{role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center">
          <SectionTag>Reviews</SectionTag>
          <SectionHeading className="mt-4">
            Experiences That <em>Speak for Themselves</em>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-union-gray md:text-base">
            Trusted by households and professionals for creating smoother, more dependable everyday support.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <div key={item.name} className="mb-5 break-inside-avoid">
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
