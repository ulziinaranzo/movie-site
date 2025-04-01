"use client";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StarWhite } from "../assets/StarWhite";
import { Badge } from "@/components/ui/badge";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";

const genre = ["Fairy Tale", "Pop Musical", "Fantasy", "Musical", "Romance"];
const description = [
  {
    director: "Jon M. Chu",
    writers: "Winnie Holzman ·  Dana Fox · Gregory Maguire",
    stars: "Cynthia Erivo ·  Ariana Grande · Jeff Goldblum",
  },
];
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
];

export default function Home() {
  return (
    <div className="w-[1440px] h-fit m-auto">
      <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
        <div className="flex justify-between gap-[4px] mb-[24px]">
          <div className="flex flex-col">
            <div className="font-[700px] text-[36px] text-white">Wicked</div>
            <div className="font-[400px] text-[18px] text-white">
              2024.11.26 · PG · 2h 40m
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[12px] text-white font-[500]">Rating</div>
            <div className="flex gap-[2px]">
              <div className="h-[48px] w-[28px]">
                <StarWhite />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="font-[400] text-[16px] text-white">6.9</div>
                  <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
                    /10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[32px] mb-[32px]">
          <img
            className="w-[290px] h-[428px]"
            src="/Images/wicked-poster.png"
          />
          <img
            className="w-[760px] h-[428px]"
            src="/Images/wicked-layout.png"
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            {genre.map((item, index) => {
              return (
                <Badge variant="outline" className="text-white">
                  {item}
                </Badge>
              );
            })}
          </div>
          <div className="font-normal w-[1080px] h-[48px] text-white">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.{" "}
          </div>
          <div className="flex gap-[53px]">
            {description.map((item, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex font-bold text-[16px] text-[white]">
                    Director
                  </div>
                  <div className="text-[16px] font-[400] text-white">
                    {description[index].director}
                  </div>
                  <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
                  <div className="font-bold text-[16px] text-[white]">
                    Writers
                  </div>
                  <div className="text-[16px] font-[400] text-white">
                    {description[index].writers}
                  </div>
                  <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
                  <div className="font-bold text-[16px] text-[white]">
                    Stars
                  </div>
                  <div className="text-[16px] font-[400] text-white">
                    {description[index].stars}
                  </div>
                  <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
                </div>
              );
            })}
          </div>
          <div className=""></div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-[36px]">
              <div className="text-[24px] font-semibold">More Like This</div>
              <div className="text-[14px] text-white font-medium">
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
                      <div className="text-sm lg:text-[18px] text-black">
                        {name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
