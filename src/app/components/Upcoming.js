"use client"
import { useState, useEffect } from "react"
import { ArrowIcon } from "../assets/ArrowIcon"
import { StarIcon } from "../assets/StarIcon"

const items = [{
    img: "Images/upcoming-box.png", 
    rating: "6.9",
    name: "Dear Santa",
}, {img: "Images/upcoming-box.png", 
    rating: "6.9",
    name: "Dear Santa",},
{img: "Images/upcoming-box.png", 
    rating: "6.9",
    name: "Dear Santa",},
{img: "Images/upcoming-box.png", 
    rating: "6.9",
    name: "Dear Santa",},
    ,
    {img: "Images/upcoming-box.png", 
        rating: "6.9",
        name: "Dear Santa",}
        ,
        {img: "Images/upcoming-box.png", 
            rating: "6.9",
            name: "Dear Santa",}
            ,
            {img: "Images/upcoming-box.png", 
                rating: "6.9",
                name: "Dear Santa",}
                ,
                {img: "Images/upcoming-box.png", 
                    rating: "6.9",
                    name: "Dear Santa",}
                    ,
                    {img: "Images/upcoming-box.png", 
                        rating: "6.9",
                        name: "Dear Santa",}
                        ,
                        {img: "Images/upcoming-box.png", 
                            rating: "6.9",
                            name: "Dear Santa",}]

export const Upcoming = () => {
    return (
        <div className="flex flex-col w-[1440px] m-auto h-fit pl-[80px] pr-[80px] pb-[52px] gap-[32px]">
            <div className="flex justify-between text-center items-center">
                <div className="flex text-[24px] font-[600] text-[#09090B] mb-[4px]">Upcoming</div>
                <div className="flex text-[14px] font-[500px]">See more <ArrowIcon/> </div>
            </div>
            <div className="flex flex-wrap gap-[32px]"> 
                {items.map(({ img, rating, name }, index) => {
                    return (
                        <div key={index} className="flex flex-col rounded-lg w-[229.73px] h-[439px]">
                            <img src={img} className="flex w-[229.73px] h-[340px]" />
                            <div className="flex flex-col bg-[#F4F4F5] h-[99px] p-[8px]">
                                <div className="flex text-[14px] gap-[4px]">
                                    <StarIcon />
                                    <b>{rating}</b>/10
                                </div>
                                <div className="flex text-[18px]">{name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
