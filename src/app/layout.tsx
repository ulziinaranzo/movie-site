"use client";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { GenreProvider } from "./_components/GenreProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "1");
    } else {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(isSystemDark);
    }
    setIsThemeLoaded(true);
  }, []);

  if (!isThemeLoaded) {
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
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main>{children}</main>
          <Footer />
        </GenreProvider>
      </body>
    </html>
  );
}
