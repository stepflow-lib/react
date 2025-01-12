import { Fragment } from "react/jsx-runtime";
import { cn } from "../../../lib/utils";
import { AnimationConfig, StepIndicatorProps } from "../../types/types";
import { OnboardingStepCircle } from "./onboarding-step-circle";
import { useOnboarding } from "../../hooks/useOnboarding";
import { defaultAnimationConfig } from "../../../lib/animationVariants";

export function OnboardingStepIndicator({
  totalSteps,
  className,
  customAnimationConfig,
}: StepIndicatorProps) {
  const { currentStep } = useOnboarding();

  const animationConfig = defaultAnimationConfig || customAnimationConfig;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Fragment key={index}>
          <OnboardingStepCircle
            step={index + 1}
            isActive={index + 1 === currentStep}
            isCompleted={index + 1 < currentStep}
            animationConfig={animationConfig}
          />
          {index < totalSteps - 1 && (
            <OnboardingStepDivider
              index={index}
              currentStep={currentStep}
              animationConfig={animationConfig}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

// Component for the step divider
const OnboardingStepDivider = ({
  index,
  currentStep,
  animationConfig,
}: {
  index: number;
  currentStep: number;
  animationConfig: AnimationConfig;
}) => {
  return (
    <div className="flex-1 h-0.5 onboarding-divider-outer mx-2 bg-border ">
      <div
        className="h-full transition-all ease-in-out bg-primary onboarding-divider-inner"
        style={{
          width: `${index + 1 < currentStep ? 100 : 0}%`,
          transitionDuration: `${animationConfig.duration}s`,
        }}
      />
    </div>
  );
};
