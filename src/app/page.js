"use client";
import { Carousel } from "./components/Carousel";
import { Header } from "./components/Header";
import { TopRated } from "./components/TopRated";
import { Upcoming } from "./components/Upcoming";
import { Popular } from "./components/Popular";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="lg:w-[1440px] w-full h-fit m-auto ">
      <Header />
      <Carousel />
      <Upcoming />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
