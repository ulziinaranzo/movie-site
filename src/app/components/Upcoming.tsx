"use client";
import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";
const [data, setData] = useState(null);

const items = [
  { img: "Images/upcoming-box.png", rating: "6.9", name: "Dear Santa" },
  {
    img: "Images/upcoming-box2.png",
    rating: "6.9",
    name: "How To Train Your Dragon Live Action",
  },
  { img: "Images/upcoming-box3.png", rating: "6.9", name: "Alien Romulus" },
  { img: "Images/upcoming-box4.png", rating: "6.9", name: "From the Ashes" },
  { img: "Images/upcoming-box5.png", rating: "6.9", name: "Space Dogg" },
  { img: "Images/upcoming-box6.png", rating: "6.9", name: "The Order" },
  { img: "Images/upcoming-box7.png", rating: "6.9", name: "Y2K" },
  {
    img: "Images/upcoming-box8.png",
    rating: "6.9",
    name: "Solo Leveling: ReAwakening",
  },
  { img: "Images/upcoming-box9.png", rating: "6.9", name: "Get Away" },
  {
    img: "Images/upcoming-box10.png",
    rating: "6.9",
    name: "Sonic the Hedgehog 3",
  },
];

export const Upcoming = () => {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit p-[20px] lg:p-[80px] gap-[20px] lg:gap-[32px]">
      <div className="flex justify-between items-center">
        <div className="text-[24px] font-[600] text-white mb-[4px]">
          Upcoming
        </div>
        <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer text-white">
          See more <ArrowIcon />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
        {items.map(({ img, rating, name }, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg overflow-hidden"
            >
              <img
                src={img}
                className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
              />

              <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
                <div className="flex items-center text-sm lg:text-[16px] text-black gap-[5px]">
                  <StarIcon />
                  <b>{rating}</b>
                  <span className="text-[12px] text-[#71717A] font-[500]">
                    /10
                  </span>
                </div>
                <div className="text-sm lg:text-[18px] text-black">{name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
