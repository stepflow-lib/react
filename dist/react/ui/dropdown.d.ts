import { default as React } from 'react';
import { DropdownCommonProps } from '../types/types';
type DropdownProps = DropdownCommonProps & {
    value: string | null;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
};
export declare function Dropdown({ children, value, setValue, className, }: DropdownProps): import("react/jsx-runtime").JSX.Element;
export declare function DropdownTrigger({ children, className }: DropdownCommonProps): import("react/jsx-runtime").JSX.Element;
export declare function DropdownContent({ children, className }: DropdownCommonProps): import("react/jsx-runtime").JSX.Element;
export declare function DropdownItem({ value, children, onClick, className, }: {
    value: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DropdownLabel({ children, className }: DropdownCommonProps): import("react/jsx-runtime").JSX.Element;
export {};
