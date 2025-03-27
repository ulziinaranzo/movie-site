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

        <Command className="hidden lg:flex rounded-lg border shadow-md md:min-w-[279px] text-white bg-black">
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <div className="flex w-[577px] h-max-[729px] p-[8px] gap-[16px]">
                  <img
                    src="/Images/wicked-poster.png"
                    className="w-[67px] h-[100px]"
                  />
                  <div className="flex justify-left flex-col ">
                    <div className="font-[600] text-[20px] text-white">
                      Wicked
                    </div>
                    <div className="flex">
                      <div className="w-[16px] h-[18px]">
                        <StarWhite />
                      </div>
                      <div className="font-[400] text-[16px] text-white">
                        6.9
                      </div>
                      <div className="font-[300] text-[14px] text-[#A1A1AA]">
                        /10
                      </div>
                    </div>
                    <div className="flex font-[500] text-[14px] text-white mt-[30px]">
                      2024
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-[79px] ml-[310px] text-[14px] font-[500] text-white">
                    See more <ArrowIcon />
                  </div>
                </div>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
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
