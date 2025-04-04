"use client";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { GenreProvider } from "./_components/GenreProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "1");
    } else {
    
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(isSystemDark);
    }
  }, []);


  useEffect(() => {
    if (darkMode === null) return;
    
    localStorage.setItem("theme", darkMode ? "1" : "0");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


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
        <GenreProvider>
        <Header setDarkMode={setDarkMode} darkMode={darkMode} onSearchResults={(results) => setSearchResults(results)} />
        <main>{children}</main>
        <Footer />
        </GenreProvider>
      </body>
    </html>
  );
}