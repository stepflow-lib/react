import { cn } from "../../../lib/utils";
import React, { memo } from "react";

export const OnboardingStepWrapper = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col gap-12 w-full max-w-2xl", className)}>
        {children}
      </div>
    );
  }
);
