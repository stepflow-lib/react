import React from "react";

import { useOnboarding } from "../../hooks/useOnboarding";
import { Button } from "../../ui/button";

export const Welcome: React.FC = () => {
  const { next } = useOnboarding();

  return (
    <div className="text-center">
      <h2 className="mb-4 text-3xl font-bold">Welcome to TaskMaster</h2>
      <p className="mb-6 text-lg">
        Let's set up your productivity powerhouse in just a few steps.
      </p>
      <img
        src="/kreed-logo.svg"
        alt="TaskMaster Logo"
        className="w-16 h-16 mx-auto mb-6"
      />
      <p className="mb-8 text-muted-foreground">
        TaskMaster helps you organize your work, boost your productivity, and
        achieve your goals.
      </p>
      <Button onClick={next} size="lg">
        Get Started
      </Button>
    </div>
  );
};
