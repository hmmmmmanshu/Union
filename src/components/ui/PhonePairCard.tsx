import { PhoneFrame } from "./PhoneFrame";

interface PhonePairCardProps {
  phones: [string, string];
}

export function PhonePairCard({ phones }: PhonePairCardProps) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[24px] border border-[#e8e5e1] bg-[#f0eeeb] px-5 py-6">
      <div className="flex items-start justify-center gap-3">
        <PhoneFrame src={phones[0]} alt="" className="w-[46%]" />
        <PhoneFrame src={phones[1]} alt="" className="w-[46%] mt-4" />
      </div>
    </div>
  );
}
