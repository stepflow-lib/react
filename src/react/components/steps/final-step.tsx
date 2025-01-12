import React from "react";
import { useOnboarding } from "../../hooks/useOnboarding";
import { Button } from "../../ui/button";

export const FinalStep: React.FC = () => {
  const { prev } = useOnboarding();

  return (
    <div className="text-center">
      <h2 className="mb-4 text-3xl font-bold">You're all set!</h2>
      <p className="mb-6 text-lg">
        Welcome to TaskMaster. Your productivity journey starts now.
      </p>

      <img
        src="/kreed-logo.svg"
        alt="Setup Complete"
        className="w-16 h-16 mx-auto mb-6"
      />
      <p className="mb-8 text-muted-foreground">
        We've personalized TaskMaster based on your preferences. Feel free to
        explore and customize further in the settings.
      </p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={prev}>
          Go Back
        </Button>
        <Button onClick={() => console.log("Redirect to dashboard")}>
          Enter TaskMaster
        </Button>
      </div>
    </div>
  );
};
