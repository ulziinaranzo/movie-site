"use client";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Load dark mode state from localStorage and handle system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "1");
    } else {
      // Fallback to system preference if no stored theme
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(isSystemDark);
    }
  }, []);

  // Update localStorage and class when dark mode changes
  useEffect(() => {
    if (darkMode === null) return;
    
    localStorage.setItem("theme", darkMode ? "1" : "0");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Prevent flickering before theme loads
  if (darkMode === null) {
    return (
      <html lang="en">
        <body className="bg-white dark:bg-black min-h-screen" />
      </html>
    );
  }

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className="max-w-[1440px] mx-auto w-full bg-white dark:bg-black transition-colors duration-200">
        <Header setDarkMode={setDarkMode} darkMode={darkMode} onSearchResults={(results) => setSearchResults(results)} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}