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
  ,
  { img: "Images/popular3.png", rating: "6.9", name: "The Dark Knight" },
  { img: "Images/popular-4.png", rating: "6.9", name: "12 Angry Men" },
  {
    img: "Images/popular-5.png",
    rating: "6.9",
    name: "The Lord of the Rings: The  Return of the King",
  },
  { img: "Images/popular-6.png", rating: "6.9", name: "Internstellar" },
  { img: "Images/popular-7.png", rating: "6.9", name: "Se7en" },
  {
    img: "Images/popular-8.png",
    rating: "6.9",
    name: "It’s a Wonderful life",
  },
  { img: "Images/popular-9.png", rating: "6.9", name: "Seven samurai" },
  {
    img: "Images/popular-10.png",
    rating: "6.9",
    name: "The Silence of the Lambs",
  },
];

export const Popular = () => {
  return (
    <div className="flex flex-col w-[1440px] m-auto h-fit pl-[80px] pr-[80px] pb-[52px] gap-[32px]">
      <div className="flex justify-between text-center items-center">
        <div className="flex text-[24px] font-[600] text-[white] mb-[4px]">
          Upcoming
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
