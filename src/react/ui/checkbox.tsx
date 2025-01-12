import { cn } from "../../lib/utils";
import { CheckboxProps } from "../types/types";

export function Checkbox({
  name,
  children,
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <label
      htmlFor={name}
      className={cn(
        "flex gap-4 text-[14px] items-center font-medium  list-none rounded cursor-pointer",
        className
      )}>
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center rounded-full cursor-pointer"
          htmlFor={name}>
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-input transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary/10 before:opacity-0 hover:before:opacity-10 checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <span className="absolute transition-opacity opacity-0 pointer-events-none text-primary-foreground top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>
      {children}
    </label>
  );
}
