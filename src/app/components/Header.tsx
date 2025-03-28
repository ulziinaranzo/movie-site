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
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { StarWhite } from "../assets/StarWhite";
import { ArrowIcon } from "../assets/ArrowIcon";
import { CommandDialog } from "cmdk";
import Link from "next/link";

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
      <Link href={"/"}>
        <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
      </Link>

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
              {type.map((item, index) => {
                return (
                  <Badge
                    variant="outline"
                    key={index}
                    className="cursor-pointer"
                  >
                    {item}
                    <GenreIcon />
                  </Badge>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <div className="hidden lg:flex ">
          <img
            src="/Images/_magnifying-glass.png"
            className="hidden lg:flex absolute left-[857px] top-[22px] w-[16px] h-[16px] "
          />
          <Input
            type="text"
            placeholder="Search"
            className="text-white pl-[30px] w-[379px]"
          />
          {/* <input
            type="text"
            placeholder="Search"
            className="divide-none outline-none text-[20px] pl-[16px] bg-transparent"
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
