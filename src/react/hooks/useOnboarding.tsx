import { useContext } from "react";
import { OnboardingContext } from "../components/onboarding/onboarding-context";

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
