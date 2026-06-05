import Image from "next/image";

interface StatCardProps {
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  title: React.ReactNode;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({
  icon,
  image,
  imageAlt,
  title,
  description,
  className = "",
  children,
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#ebe8e4] bg-[#f5f3f0] p-6 ${className}`}
    >
      <div className="pointer-events-none absolute right-0 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tl from-union-orange/20 to-transparent blur-2xl" />

      {children}
      {image && (
        <Image src={image} alt={imageAlt ?? ""} width={320} height={200} className="mb-4 h-auto w-full" />
      )}
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-union-orange text-white">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-bold leading-snug text-[#3d3428] md:text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#7a756d]">{description}</p>
    </div>
  );
}
