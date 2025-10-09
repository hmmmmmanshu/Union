import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridItemProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto",
        "auto-rows-[12rem] sm:auto-rows-[14rem] md:auto-rows-[16rem] lg:auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  title,
  description,
  header,
  icon,
  className,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-3 sm:p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-3 sm:space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-1 sm:mb-2 mt-1 sm:mt-2 text-sm sm:text-base">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs sm:text-sm dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
