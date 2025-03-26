"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LineIcon } from "../assets/LineIcon";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { GenreIcon } from "../assets/GenreIcon";

import { Label } from "@radix-ui/react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const type = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Flim-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

export const Header = () => {
  return (
    <div className="flex w-full justify-between m-0 h-fit bg-[black] py-[11.5px] px-5 lg:px-20 ">
      <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
      <div className="flex justify-center items-center gap-[12px] text-[14px] font-medium">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Genres</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[577px]  flex flex-col p-[20px]">
            <div className="text-[24px] font-[600] text-[#09090B]">Genres</div>
            <div className="text-[16px] text-[#09090B] font-[400]">
              See lists of movies by genre
            </div>
            <div className="mt-[16px] mb-[16px]">
              <LineIcon />
            </div>
            <div className="flex flex-wrap w-[537px] gap-[16px]">
              {type.map((item) => {
                return (
                  <Badge variant="outline">
                    {item}
                    <GenreIcon />
                  </Badge>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        <div className="hidden lg:flex items-center pl-[12px] pt-[10px] pb-[10px] w-[279px] h-[36px] rounded-[10px] text-[14px] opacity-50 border border-[#272722A]">
          <img
            className="flex w-16px h-16px"
            src="/Images/_magnifying-glass.png"
          />
          <input
            className="w-[253px] h-[36px] text-white divide-none outline-none"
            placeholder="Search"
          />
          {/* <input
            type="text"
            className="w-[253px] h-[36px]  bg-transparent divide-none outline-none left-[90px] top-[40px]"
            placeholder="Search"
          /> */}
        </div>
      </div>
      <div className="flex gap-[12px]">
        <img
          className=" lg:hidden w-[36px] h-[36px] rounded-xl"
          src="/Images/Search.png"
        />
        <img className="w-[36px] h-[36px] rounded-xl " src="/Images/Moon.png" />
      </div>
    </div>
  );
};
