"use client";

import { Header } from "./components/Header";
import { TopRated } from "./components/TopRated";
import { Popular } from "./components/Popular";
import { Footer } from "./components/Footer";
import { Carousel } from "./components/Carousel";
import { UpComing } from "./components/Upcoming";

export default function Home() {
  return (
    <div className="lg:w-[1440px] w-full h-fit m-auto dark:bg-[black] bg-white">
      <Carousel />
      <UpComing/>
      <Popular />
      <TopRated />
    </div>
  );
}
