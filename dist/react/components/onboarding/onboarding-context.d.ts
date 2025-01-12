import { ReactNode } from 'react';
import { OnboardingContextValue } from '../../types/types';
export declare const OnboardingContext: import('react').Context<OnboardingContextValue | undefined>;
export declare const OnboardingProvider: ({ children, stepsCount, }: {
    children: ReactNode;
    stepsCount: number;
}) => import("react/jsx-runtime").JSX.Element;
