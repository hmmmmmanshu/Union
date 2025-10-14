import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  name: string;
  description: string;
  href?: string;
  cta?: string;
  className?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  background?: ReactNode;
}

export const BentoCard = ({
  name,
  description,
  href,
  cta,
  className,
  Icon,
  background,
}: BentoCardProps) => {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.05),0_2px_4px_rgba(0,0,0,.1)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_0_0_1px_rgba(255,255,255,.1)] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        "dark:[background:linear-gradient(180deg,rgba(255,255,255,.1)_0%,rgba(255,255,255,0)_100%)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:p-px before:transition-opacity before:duration-300",
        "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0",
        "hover:before:opacity-100",
        "hover:transform hover:duration-300 hover:ease-out group-hover:scale-[1.02]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {background}
      
      <div className="pointer-events-none relative flex transform-gpu flex-col items-start gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-z-0">
        <div className="flex items-center gap-2 text-second">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="text-xs font-medium">{name}</span>
        </div>
        <div className="text-lg font-semibold text-neutral-700 dark:text-white">
          {description}
        </div>
        {cta && (
          <div className="pointer-events-auto">
            <a
              href={href}
              className="text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              {cta}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 inline-block h-3 w-3 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M6.92708 6.00014L3.46225 2.53531L4.17708 1.82047L8.35692 6.00014L4.17708 10.1798L3.46225 9.46497L6.92708 6.00014Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
