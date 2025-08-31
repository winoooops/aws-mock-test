import React, { createContext, useState, useEffect } from "react";
import SchemeSelector from "../components/SchemeSelector";

const ColorSchemeContext = createContext();

export { ColorSchemeContext };

const colorSchemes = [
  { id: 1, name: "deepCove" },
  { id: 2, name: "cyberBlue" },
  { id: 3, name: "neonGreen" },
  { id: 4, name: "claude" },
];

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(() => {
    const saved = localStorage.getItem("colorScheme");
    return saved || "deepCove";
  });

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
    // Add color scheme class to root element
    document.documentElement.className = colorScheme;
  }, [colorScheme]);

  // Initialize class on first render
  useEffect(() => {
    document.documentElement.className = colorScheme;
  }, []);

  const value = {
    colorScheme,
    setColorScheme,
    availableSchemes: colorSchemes,
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
