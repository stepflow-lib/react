import { cn } from "../../../lib/utils";

export const OnboardingHeader = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => <div className={cn("text-2xl font-bold", className)}>{title}</div>;
