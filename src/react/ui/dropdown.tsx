import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { createContext, useContext, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { cn } from "../../lib/utils";
import { DropdownCommonProps, DropdownContextType } from "../types/types";

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

type DropdownProps = DropdownCommonProps & {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export function Dropdown({
  children,
  value,
  setValue,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, value, setValue }}>
      <div ref={dropdownRef} className={cn("relative w-full", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, className }: DropdownCommonProps) {
  const { isOpen, setIsOpen } = useContext(DropdownContext)!;

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 text-left bg-background border border-input rounded-md hover:bg-primary-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        className,
        isOpen ? "ring-2 ring-primary" : ""
      )}
      aria-haspopup="listbox"
      aria-expanded={isOpen}>
      {children}
      <ChevronDown
        className={cn(
          "w-5 h-5 transition-transform duration-200",
          isOpen ? "transform rotate-180" : ""
        )}
      />
    </button>
  );
}

export function DropdownContent({ children, className }: DropdownCommonProps) {
  const { isOpen } = useContext(DropdownContext)!;
  const contentRef = useRef<HTMLUListElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={contentRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute z-10 flex flex-col w-full gap-1 p-2 mt-1 overflow-auto border rounded-md shadow-lg bg-background border-input max-h-60 focus:outline-none",
            className
          )}
          role="listbox">
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({
  value,
  children,
  onClick,
  className,
}: {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const {
    setIsOpen,
    value: selectedValue,
    setValue: setSelectedValue,
  } = useContext(DropdownContext)!;

  const handleSelect = () => {
    setSelectedValue(value);
    setIsOpen(false);
    onClick?.();
  };

  return (
    <li
      className={cn(
        "relative rounded-sm py-2 pl-3 pr-9 cursor-pointer select-none hover:bg-muted focus:outline-none focus:bg-muted",
        className,
        selectedValue === value ? "bg-primary/10" : ""
      )}
      onClick={handleSelect}
      role="option"
      aria-selected={selectedValue === value}>
      <span className="block truncate">{children}</span>
      {selectedValue === value && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </li>
  );
}

export function DropdownLabel({ children, className }: DropdownCommonProps) {
  const { value: selectedValue } = useContext(DropdownContext)!;
  return (
    <span className={cn("block truncate", className)}>
      {selectedValue ? children : "Select an option"}
    </span>
  );
}
