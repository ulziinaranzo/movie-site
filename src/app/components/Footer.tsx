"use client";

import { EmailIcon } from "../assets/EmailIcon";
import { Phone } from "../assets/PhoneIcon";

export const Footer = () => {
  return (
    <div className="flex w-full h-[280px] bg-[#4338CA] pt-[40px] pb-[40px] pl-[80px] pr-[80px]">
      <div className="flex gap-[28px] lg:gap-[96px] flex-col lg:flex lg:justify-between">
        <div className="flex flex-col gap-[12px]">
          <img src="/Images/LogoWhite.png" className="w-[92px] h-[20px]" />
          <div className="text-[#FAFAFA] font-[400] text-[14px]">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col lg:ml-[393px] gap-[12px] w-[174px]">
            <div className="flex text-[#FAFAFA] text-[14px] font-[400]">
              Contact Information
            </div>
            <div className="flex text-[#FAFAFA] text-[14px] font-[400] gap-[12px]">
              <EmailIcon />
              <div className="flex flex-col">
                <div className="flex">Email:</div>
                <div className="flex">support@movieZ.com</div>
              </div>
            </div>
            <div className="flex text-[#FAFAFA] text-[14px] font-[400] gap-[12px]">
              <Phone />
              <div className="flex flex-col">
                <div className="flex">Phone:</div>
                <div className="flex">+976 (11) 123-4567</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] text-[#FAFAFA] text-[14px] font-[400]">
            <div>Follow us </div>
            <div>
              <div className="flex flex-col lg:flex-row gap-[12px]">
                <div>Facebook</div>
                <div>Instagram</div>
                <div>Twitter</div>
                <div>Youtube</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
