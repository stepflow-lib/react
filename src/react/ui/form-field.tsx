import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { FormFieldProps } from "../types/types";

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  className,
  inputClassName,
  labelClassName,
  required, // New prop to determine if field is required
  errorMessage, // Error message for invalid field
  ...props
}) => {
  const [touched, setTouched] = useState(false); // To track if the user interacted with the input

  // Check if the field is invalid based on required flag
  const isInvalid = required && touched && !props.value;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium text-secondary-foreground",
          labelClassName
        )}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName,
            isInvalid && "border-red-500" // Apply red border if invalid
          )}
          {...props}
          onBlur={() => setTouched(true)} // Mark input as touched when the user leaves the input
        />
        {/* Conditionally render the error message if it's invalid and required */}
        {isInvalid && (
          <span className="absolute right-0 text-xs text-red-500 -translate-y-full -top-2.5">
            {isInvalid
              ? errorMessage || "This field is required"
              : errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};
