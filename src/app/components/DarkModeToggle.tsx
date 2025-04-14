"use client";
import { useEffect } from "react";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-9 h-9 rounded-xl cursor-pointer flex items-center justify-center"
    >
      <img
        src={darkMode ? "/Images/Icon-Button.png" : "/Images/Moon.png"}
        alt={darkMode ? "Light Mode" : "Dark Mode"}
        className="w-[41px] h-[41px]"
      />
    </button>
  );
};