"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body className={darkMode ? "dark" : ""}>
        <div className="max-w-[1440px] mx-auto w-full dark:bg-black bg-white">
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
