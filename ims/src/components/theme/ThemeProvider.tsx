
import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemeType, ColorScheme } from "@/types";

interface ThemeContextType {
  theme: ThemeType;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeType) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserTheme, updateUserColorScheme } = useAuth();
  
  // Apply theme and color scheme to document
  useEffect(() => {
    if (user?.theme) {
      applyTheme(user.theme);
    }
    
    if (user?.colorScheme) {
      applyColorScheme(user.colorScheme);
    }
  }, [user?.theme, user?.colorScheme]);
  
  const applyTheme = (theme: ThemeType) => {
    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  };
  
  const applyColorScheme = (colorScheme: ColorScheme) => {
    const root = window.document.documentElement;
    root.setAttribute("data-color-scheme", colorScheme);
  };
  
  const setTheme = (theme: ThemeType) => {
    updateUserTheme(theme);
  };
  
  const setColorScheme = (colorScheme: ColorScheme) => {
    updateUserColorScheme(colorScheme);
  };
  
  return (
    <ThemeContext.Provider
      value={{
        theme: user?.theme || "light",
        colorScheme: user?.colorScheme || "blue",
        setTheme,
        setColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
