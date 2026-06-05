export function HighlightText({ children }: { children: string }) {
  return <em className="font-serif font-normal not-italic text-union-orange" style={{ fontStyle: "italic" }}>{children}</em>;
}
