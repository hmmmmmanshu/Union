import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  character: string;
}

export function ServiceCard({ title, description, character }: ServiceCardProps) {
  return (
    <div className="group relative h-[300px] overflow-hidden rounded-[32px] border border-[#e8e5e1] bg-[#f8f6f3]">
      <div className="pointer-events-none absolute -right-6 -bottom-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(232,115,74,0.32)_0%,rgba(253,232,216,0.15)_45%,transparent_72%)]" />

      <div className="relative z-10 flex h-full flex-col p-7 pr-[46%]">
        <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-[#3d3428]">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#7a756d]">
          {description}
        </p>
        <button
          type="button"
          className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-b from-[#f08050] to-[#e06030] text-white shadow-[0_4px_18px_rgba(232,115,74,0.48)] transition-transform group-hover:scale-105"
          aria-label={`Learn more about ${title}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-0 bottom-0 h-full w-[50%]">
        <Image
          src={character}
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 45vw, 210px"
        />
      </div>
    </div>
  );
}
