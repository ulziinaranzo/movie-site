"use client";

import { Header } from "./components/Header";
import { TopRated } from "./components/TopRated";
import { UpComing } from "./components/Upcoming";
import { Popular } from "./components/Popular";
import { Footer } from "./components/Footer";
import { Carousel } from "./components/Carousel";

export default function Home() {
  return (
    <div className="lg:w-[1440px] w-full h-fit m-auto bg-[black] ">
      <Carousel />
      <UpComing />
      <Popular />
      <TopRated />
    </div>
  );
}
