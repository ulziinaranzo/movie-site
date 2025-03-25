"use client"
import { Carousel } from "./components/carousel";
import { Upcoming } from "./components/Upcoming";

export default function Home() {
  return (
    <div className="w-[1440px] h-fit m-auto ">
      <Carousel />
      <Upcoming />
    </div>

  );
}
