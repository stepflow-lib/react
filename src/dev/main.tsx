import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/global.css";
import { Welcome } from "../react/components/steps/welcome";
import { WorkspaceSetup } from "../react/components/steps/workspace-setup";
import { PersonalInfo } from "../react/components/steps/personal-info";
import { Preferences } from "../react/components/steps/preferences";
import { FinalStep } from "../react/components/steps/final-step";
import { OnboardingProvider } from "../react/components/onboarding/onboarding-context";
import { OnboardingHeader } from "../react/components/onboarding/onboarding-header";
import { OnboardingStepWrapper } from "../react/components/onboarding/onboarding-step-wrapper";
import { OnboardingStepIndicator } from "../react/components/onboarding/onboarding-step-indicator";
import { OnboardingSteps } from "../react/components/onboarding/onboarding-steps";
import { ThemeToggle } from "../react/components/theme-toggle";
import { OnboardingStep } from "../react/types/types";

const ReactDemo = () => {
  const steps: OnboardingStep[] = [
    { id: 1, component: <Welcome /> },
    { id: 2, component: <WorkspaceSetup /> },
    { id: 3, component: <PersonalInfo /> },
    { id: 4, component: <Preferences /> },
    { id: 5, component: <FinalStep /> },
  ];

  return (
    <div className="items-center justify-center h-screen text-secondary-foreground bg-background ">
      <OnboardingProvider stepsCount={steps.length}>
        <div className="flex flex-col items-center max-w-2xl gap-4 py-8 mx-auto">
          <OnboardingHeader title="Hi App" />

          <OnboardingStepWrapper>
            <OnboardingStepIndicator totalSteps={steps.length} />
          </OnboardingStepWrapper>

          <OnboardingSteps steps={steps} />
        </div>
      </OnboardingProvider>
      <ThemeToggle />
    </div>
  );
};

// Mount React
ReactDOM.createRoot(document.getElementById("react-root")!).render(
  <React.StrictMode>
    <ReactDemo />
  </React.StrictMode>
);
