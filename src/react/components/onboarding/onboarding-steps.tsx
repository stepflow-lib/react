import { AnimatePresence, motion } from "framer-motion";
import { defaultAnimationProps } from "../../../lib/animationVariants";
import { OnboardingStepsProps } from "../../types/types";
import { useOnboarding } from "../../hooks/useOnboarding";

export const OnboardingSteps = ({
  steps,
  customAnimationConfig,
  customAnimationVariants,
}: OnboardingStepsProps) => {
  const { currentStep } = useOnboarding();

  // Use the default combined animation props if none are passed
  const { config: animationConfig, variants: animationVariants } =
    customAnimationConfig || customAnimationVariants
      ? {
          config: customAnimationConfig,
          variants: customAnimationVariants,
        }
      : defaultAnimationProps;

  const renderCurrentStep = () => {
    if (currentStep >= 0 && currentStep < steps.length)
      return steps[currentStep - 1].component;

    // For the last step
    if (currentStep === steps.length) return steps[steps.length - 1].component;

    return null;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        className="w-full"
        exit="exit"
        transition={{
          duration: animationConfig?.duration,
          ease: animationConfig?.ease,
        }}>
        {renderCurrentStep()}
      </motion.div>
    </AnimatePresence>
  );
};
