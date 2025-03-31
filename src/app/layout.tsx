"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <html lang="en">
      <body className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
        <div className="max-w-[1440px] mx-auto w-full">
          <Header toggleDarkMode={() => setDarkMode(!darkMode)} />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
