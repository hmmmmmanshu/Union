export function SectionTag({ children }: { children: string }) {
  return (
    <span className="section-tag inline-flex items-center gap-1.5 border border-[#e8e5e1] bg-white/60">
      <svg className="h-3 w-3 shrink-0 text-union-orange" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.5l1.8 5.5h5.9l-4.8 3.5 1.8 5.5L12 16.5l-4.7 3.5 1.8-5.5-4.8-3.5h5.9L12 2.5z" />
      </svg>
      {children}
    </span>
  );
}
