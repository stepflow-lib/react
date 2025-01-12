import React from "react";
import { InputProps } from "../types/types";
import { FormField } from "./form-field";

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  if (label) {
    return <FormField label={label} {...props} />;
  }
  return <FormField label="" {...props} />;
};
