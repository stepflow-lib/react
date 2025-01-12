import { cn } from "../../lib/utils";
import { TextLabelProps } from "../types/types";

export function TextLabel({ text, className }: TextLabelProps) {
  return (
    <div className={cn("block text-sm font-medium mb-1", className)}>
      {text}
    </div>
  );
}
