"use client";

import { useEffect, useState } from "react";

const items = [
  "/Images/scroll.png",
  "/Images/scroll1.png",
  "/Images/scroll2.png",
];

export const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextButton = () => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevButton = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex relative overflow-hidden pb-[52px] pt-[32px]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((img, index) => (
          <img
            src={img}
            key={index}
            className="object-cover h-[600px] w-full object-cover"
          />
        ))}
      </div>
      <button
        onClick={prevButton}
        className="flex justify-center items-center absolute left-[44px] top-1/2 transform -translate-y-1/2 bg-[white] p-[12px] text-[black] rounded-full h-[40px] w-[40px]"
      >
        ❮
      </button>
      <button
        onClick={nextButton}
        className="flex justify-center items-center absolute right-[44px] top-1/2 transform -translate-y-1/2 bg-[white] p-[12px] text-[black] rounded-full h-[40px] w-[40px]"
      >
         ❯
      </button>
    </div>
  );
};
