import {
  AnimationVariants,
  AnimationConfig,
  AnimationProps,
} from "../react/types/types";

const animationConfig: AnimationConfig = {
  direction: "horizontal",
};

export const defaultAnimationConfig: AnimationConfig = {
  duration: 0.3,
  ease: "easeInOut",
  direction: "horizontal" as const,
};

export const defaultAnimationVariants: AnimationVariants = {
  initial: {
    opacity: 0,
    [animationConfig.direction === "horizontal" ? "x" : "y"]: 20,
  },
  animate: {
    opacity: 1,
    [animationConfig.direction === "horizontal" ? "x" : "y"]: 0,
  },
  exit: {
    opacity: 0,
    [animationConfig.direction === "horizontal" ? "x" : "y"]: -20,
  },
};

// New combined animation props object
export const defaultAnimationProps: AnimationProps = {
  config: defaultAnimationConfig,
  variants: defaultAnimationVariants,
};
