type Theme = "light" | "dark";
export declare const useTheme: () => {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: import('react').Dispatch<import('react').SetStateAction<Theme>>;
};
export {};
