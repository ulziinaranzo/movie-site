"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "../assets/StarIcon";
import { PlayIcon } from "../assets/PlayIcon";
import Link from "next/link";

type inf = {
  img: string;
  name: string;
  rating: string;
  description: string;
};
const items = [
  {
    img: "/Images/carousel-1.png",
    name: "Wicked",
    rating: "6.9",
    description:
      "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. ",
  },
  {
    img: "/Images/carousel-2.png",
    name: "Gladiator II",
    rating: "6.9",
    description:
      "After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.",
  },
  {
    img: "/Images/carousel-3.png",
    name: "Moana 2",
    rating: "6.9",
    description:
      "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
  },
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
    <div className="w-full flex flex-col items-center mb-[52px]">
      <Link href={"/wicked"}>
        <div className="relative overflow-hidden w-[375px] h-fit lg:w-full lg:h-[600px] ">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => (
              <div key={i} className="relative w-full shrink-0">
                <img
                  src={item.img}
                  className="h-[246px] w-full lg:h-[600px] object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevButton}
            className="hidden lg:flex justify-center items-center absolute left-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px]"
          >
            ❮
          </button>
          <button
            onClick={nextButton}
            className="hidden lg:flex justify-center items-center absolute right-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px]"
          >
            ❯
          </button>
        </div>
        <div className="w-full max-w-[375px] lg:max-w-[1040px] p-[20px] lg:p-[40px] lg:absolute top-60 left-80">
          <div className="flex justify-between lg:flex-col">
            <div className="flex flex-col">
              <div className="text-[14px] lg:text-[16px] text-white font-regular">
                Now Playing:
              </div>
              <div className="text-[24px] lg:text-[36px] text-white font-semibold">
                {items[index].name}
              </div>
            </div>

            <div className="flex">
              <div className="w-6 h-6 lg:w-[10px] lg:h-[10px] lg:mt-[3px]">
                <StarIcon />
              </div>
              <div className="text-[16px] lg:text-[18px] font-mediumtext-white ml-[8px] lg:font-[600] text-[white] lg:text-[white]">
                {items[index].rating}
              </div>
              <span className="text-[14px] lg:text-[16px] font-regular text-[#71717A] mt-[1px] ml-[1px] lg:mt-0.5 ">
                /10
              </span>
            </div>
          </div>
          <div className="w-[335px] h-[100px] text-[14px] lg:w-[302px] justrify-between lg:h-auto lg:text-[16px]text-white mt-2 lg:max-w-302 text-[white] lg:text-[white]">
            {items[index].description}
          </div>
          <button className="flex justify-center items-center w-[145px] h-[40px] text-black lg:text-black bg-white gap-[8px] mt-4 rounded-md font-[500]">
            <PlayIcon /> Watch Trailer
          </button>
        </div>
      </Link>
    </div>
  );
};
