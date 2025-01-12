import {
  createContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { OnboardingContextValue } from "../../types/types";

export const OnboardingContext = createContext<
  OnboardingContextValue | undefined
>(undefined);

export const OnboardingProvider = ({
  children,
  stepsCount,
}: {
  children: ReactNode;
  stepsCount: number;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const next = useCallback(
    () => setCurrentStep((prev) => Math.min(prev + 1, stepsCount + 1)),
    [stepsCount]
  );
  const prev = useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 0)),
    []
  );
  const goToStep = useCallback(
    (step: number) =>
      setCurrentStep(Math.min(Math.max(step, 0), stepsCount + 1)),
    [stepsCount]
  );

  const value = useMemo(
    () => ({
      currentStep,
      totalSteps: stepsCount + 2,
      next,
      prev,
      goToStep,
      setCurrentStep,
    }),
    [currentStep, stepsCount, next, prev, goToStep]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
