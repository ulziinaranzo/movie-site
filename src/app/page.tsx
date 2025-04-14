"use client";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Carousel } from "./components/Carousel";
import HomePage from "./components/Mainpage";

export default function Home() {
  return (
    <div className="lg:w-[1440px] w-full h-fit m-auto dark:bg-[black] bg-white">
      <Carousel />
      <HomePage/>
    </div>
  );
}
