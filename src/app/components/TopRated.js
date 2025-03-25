"use client";
import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";

const items = [
  { img: "Images/toprated-1.png", rating: "6.9", name: "Pulp Fiction" },
  {
    img: "Images/toprated-2.png",
    rating: "6.9",
    name: "The Lord of the Rings: Fellowship of the Kings",
  },
  ,
  {
    img: "Images/toprated-3.png",
    rating: "6.9",
    name: "The Good, the Bad and the Ugly",
  },
  { img: "Images/toprated-4.png", rating: "6.9", name: "Forrest Gump" },
  { img: "Images/toprated-5.png", rating: "6.9", name: "Fight Club" },
  { img: "Images/toprated-6.png", rating: "6.9", name: "Saving Private Ryan" },
  { img: "Images/toprated-7.png", rating: "6.9", name: "City of God" },
  {
    img: "Images/toprated-8.png",
    rating: "6.9",
    name: "The Green Mile",
  },
  { img: "Images/toprated-9.png", rating: "6.9", name: "Life is Beautiful" },
  {
    img: "Images/toprated-10.png",
    rating: "6.9",
    name: "Terminator 2: Judgement Day",
  },
];

export const TopRated = () => {
  return (
    <div className="flex flex-col w-[1440px] m-auto h-fit pl-[80px] pr-[80px] pb-[52px] gap-[32px]">
      <div className="flex justify-between text-center items-center">
        <div className="flex text-[24px] font-[600] text-[white] mb-[4px]">
          Top Rated
        </div>
        <div className="flex items-center text-[14px] font-[500px] gap-[8px]">
          See more <ArrowIcon />{" "}
        </div>
      </div>
      <div className="flex flex-wrap gap-[32px]">
        {items.map(({ img, rating, name }, index) => {
          return (
            <div
              key={index}
              className="flex flex-col rounded-lg overflow-hidden w-[229.73px] h-[439px]"
            >
              <img src={img} className="flex w-[229.73px] h-[340px]" />
              <div className="flex flex-col bg-[#F4F4F5] h-[99px] p-[8px]">
                <div className="flex text-[14px] gap-[4px] text-[black]">
                  <StarIcon />
                  <b>{rating}</b>/10
                </div>
                <div className="flex text-[18px] text-[black]">{name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
