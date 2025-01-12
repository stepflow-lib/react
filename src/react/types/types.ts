import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface OnboardingStep {
  id: number;
  component: ReactNode;
}

export interface OnboardingStepsProps {
  steps: OnboardingStep[];
  customAnimationConfig?: AnimationConfig;
  customAnimationVariants?: AnimationVariants;
}

export interface AnimationConfig {
  duration?: number;
  ease?: string;
  direction?: "horizontal" | "vertical";
}

export type AnimationProperty = {
  opacity: number;
  x?: number;
  y?: number;
};

export type AnimationVariants = {
  initial: AnimationProperty;
  animate: AnimationProperty;
  exit: AnimationProperty;
};

// New type added for combining both AnimationConfig and AnimationVariants
export interface AnimationProps {
  config: AnimationConfig;
  variants: AnimationVariants;
}

export interface StepIndicatorProps {
  totalSteps: number;
  // currentStep: number;
  // onStepClick: (step: number) => void;
  className?: string;
  customAnimationConfig?: AnimationConfig;
}

export interface StepCircleProps {
  step: number;
  isActive: boolean;
  isCompleted: boolean;

  animationConfig: AnimationConfig;
}

export interface OnboardingContextValue {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;
}

export type DropdownCommonProps = {
  children: React.ReactNode;
  className?: string;
};

export type TextLabelProps = {
  text: string;
  className?: string;
};

export type InputProps = Omit<FormFieldProps, "label"> & {
  label?: string;
};

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorMessage?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export interface CheckboxProps {
  name: string;
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export type ClickOutsideHandler = (event: Event) => void;
