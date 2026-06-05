const avatarColors = [
  "bg-orange-300",
  "bg-amber-400",
  "bg-orange-400",
  "bg-yellow-300",
  "bg-orange-200",
  "bg-amber-300",
  "bg-orange-500",
  "bg-amber-200",
  "bg-orange-300",
];

export function AvatarGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {avatarColors.map((color, i) => (
        <div
          key={i}
          className={`aspect-square overflow-hidden rounded-full border-2 border-white ${color} shadow-sm`}
        />
      ))}
    </div>
  );
}
