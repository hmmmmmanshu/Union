const jobs = [
  {
    logo: "UC",
    logoBg: "bg-black",
    title: "House Cleaner",
    pay: "₹600/day",
    location: "Whitefield, Bangalore",
    cardBg: "bg-black",
  },
  {
    logo: "plum",
    logoBg: "bg-[#e84393]",
    title: "Plumbing Partner",
    pay: "₹1,200 / Day",
    location: "HSR Layout, Bangalore",
    cardBg: "bg-[#333]",
  },
];

export function MissionPhone() {
  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="overflow-hidden rounded-[28px] border-[3px] border-union-orange bg-union-orange p-[3px]">
        <div className="overflow-hidden rounded-[24px] bg-[#f5f3f0] p-3">
          <div className="space-y-2">
            {jobs.map((job, i) => (
              <div
                key={job.title}
                className={`${job.cardBg} rounded-2xl p-3 ${i === 1 ? "ml-3 -mt-1" : ""}`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${job.logoBg} text-[9px] font-bold text-white`}
                  >
                    {job.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-semibold text-white">{job.title}</span>
                      <span className="shrink-0 text-[10px] text-union-orange">Details</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[9px] text-gray-400">
                      <span>💼</span>
                      <span>{job.pay}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[9px] text-gray-400">
                      <span>📍</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-3 border-t border-[#e0ddd8] pt-2 text-[9px]">
            <span className="border-b border-union-orange pb-0.5 font-medium text-union-orange">
              Upcoming Works
            </span>
            <span className="text-gray-400">Previous Works</span>
            <span className="text-gray-400">B2B Jobs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
