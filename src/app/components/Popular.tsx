"use client";
import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";

const items = [
  {
    img: "Images/popular1.png",
    rating: "6.9",
    name: "The Shawshank Redemption",
  },
  {
    img: "Images/popular2.png",
    rating: "6.9",
    name: "The Godfather",
  },
  { img: "Images/popular3.png", rating: "6.9", name: "The Dark Knight" },
  { img: "Images/popular-4.png", rating: "6.9", name: "12 Angry Men" },
  {
    img: "Images/popular-5.png",
    rating: "6.9",
    name: "The Lord of the Rings: The Return of the King",
  },
  { img: "Images/popular-6.png", rating: "6.9", name: "Interstellar" },
  { img: "Images/popular-7.png", rating: "6.9", name: "Se7en" },
  {
    img: "Images/popular-8.png",
    rating: "6.9",
    name: "It’s a Wonderful Life",
  },
  { img: "Images/popular-9.png", rating: "6.9", name: "Seven Samurai" },
  {
    img: "Images/popular-10.png",
    rating: "6.9",
    name: "The Silence of the Lambs",
  },
];

export const Popular = () => {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] gap-[32px]">
      <div className="flex justify-between text-center items-center">
        <div className="flex text-[24px] font-[600] text-[white] mb-[4px]">
          Popular
        </div>
        <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer">
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
                className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px] overflow-hidden"
              />
              <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col overflow-hidden">
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
