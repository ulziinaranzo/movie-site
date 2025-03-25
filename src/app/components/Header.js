"use client";

export const Header = () => {
  return (
    <div className="flex w-full justify-between m-0 h-fit bg-[black] py-[11.5px] px-5 lg:px-20 ">
      <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
      <div className="flex justify-center items-center gap-[12px] text-[14px] font-medium">
        <div className="hidden lg:flex border border-[#27272A] bg-[black] pt-[8px] pb-[8px] pl-[16px] pr-[16px] gap-[8px] rounded-[10px] h-[36px]">
          <img
            src="/Images/chevron-down.png"
            className="flex w-[16px] h-[16px] mt-[3px]"
          />
          <div className="text-[14px] text-[white] flex">Genre</div>
        </div>
        <div className="hidden lg:flex items-center pl-[12px] pt-[10px] pb-[10px] w-[279px] h-[36px] rounded-[10px] text-[14px] opacity-50 border border-[#272722A]">
          <img
            className="flex w-16px h-16px"
            src="/Images/_magnifying-glass.png"
          />
          <input
            type="text"
            className="w-[253px] h-[36px]  bg-transparent divide-none outline-none left-[90px] top-[40px]"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex gap-[12px]">
        <img
          className="w-[36px] h-[36px] rounded-xl"
          src="/Images/Search.png"
        />
        <img className="w-[36px] h-[36px] rounded-xl " src="/Images/Moon.png" />
      </div>
    </div>
  );
};
