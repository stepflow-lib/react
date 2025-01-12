import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { StepCircleProps } from "../../types/types";
import { CheckIcon } from "lucide-react";
import { useMemo } from "react";

export function OnboardingStepCircle({
  step,
  isActive,
  isCompleted,
  animationConfig,
}: StepCircleProps) {
  const circleClasses = cn(
    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
    isActive
      ? "bg-primary outline outline-4 outline-primary/20 text-primary-foreground"
      : isCompleted
      ? "bg-primary text-primary-foreground"
      : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
  );

  const motionProps = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: animationConfig.duration },
  };

  const content = useMemo(
    () =>
      isCompleted ? (
        <motion.div
          key="check"
          className="relative z-20 bg-green"
          {...motionProps}>
          <CheckIcon className="w-5 h-5" />
        </motion.div>
      ) : (
        <motion.span key="step" className="relative z-20" {...motionProps}>
          {step}
        </motion.span>
      ),
    [isCompleted, step, animationConfig.duration]
  );

  return (
    <div
      className={`${circleClasses} onboarding-step-circle`}
      style={{ transitionDuration: `${animationConfig.duration}s` }}>
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </div>
  );
}
