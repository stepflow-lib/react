import React from "react";
import { cn } from "../../lib/utils";
import { ButtonProps } from "../types/types";
import { Spinner } from "./spinner";

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border border-input hover:bg-accent hover:text-accent-foreground ",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeStyles = {
    sm: "h-9 px-3",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={loading || disabled}
      {...props}>
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
};
