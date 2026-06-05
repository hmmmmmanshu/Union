import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export function PhoneFrame({ src, alt, className = "" }: PhoneFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Thin metallic orange iPhone frame */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-[#e8a070] via-[#d48050] to-[#c06838] p-[2px] shadow-md">
        <div className="overflow-hidden rounded-[26px] bg-black">
          {/* Dynamic island */}
          <div className="absolute top-[6px] left-1/2 z-10 h-[10px] w-[50px] -translate-x-1/2 rounded-full bg-black" />
          <Image
            src={src}
            alt={alt}
            width={140}
            height={280}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
