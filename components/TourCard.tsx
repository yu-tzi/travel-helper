"use client";

import { format, isBefore } from "date-fns";
import { HiOutlineChevronDown, HiOutlineClock } from "react-icons/hi";

export const TourCard = ({
  selectBlock,
  setSelectBlock,
  tour,
}: {
  selectBlock: any;
  setSelectBlock: any;
  tour: any;
}) => {
  return (
    <div
      className={`bg-white text-[#866ce7e9] border-2 border-neutral-200 w-[calc(100%-55px)] h-18 rounded-md mb-3 flex flex-col justify-start pt-1.5 pb-2 px-2`}
    >
      {/* card name */}
      <div
        className="text-sm font-medium truncate flex flex-row items-center justify-between cursor-pointer"
        onClick={() => {
          if (selectBlock === tour.id) {
            setSelectBlock("");
          } else {
            setSelectBlock(tour.id);
          }
        }}
      >
        {tour.name}
        <HiOutlineChevronDown
          className={`transition ease-in-out ${
            selectBlock === tour.id && "rotate-180"
          }`}
        />
      </div>
      {/* card status & time */}
      <div className="text-xs opacity-80">
        {isBefore(new Date(tour.timestamp), new Date()) ? "upcoming" : "passed"}
      </div>
      <div className="flex flex-row justify-end items-center gap-1">
        <HiOutlineClock />
        <div className="text-xs">
          {format(new Date(tour.timestamp), "HH:mm")}
        </div>
      </div>
      {/* card todos */}
      {selectBlock === tour.id && (
        <div className="mt-2 flex flex-col gap-2.5">
          {tour.todo.length < 1 && (
            <div className="text-xs text-slate-500">還沒有待辦事項</div>
          )}
          {tour.todo.map((item: any) => {
            return (
              <div
                key={item.id}
                className="text-sm text-slate-500 flex flex-row items-start gap-1.5"
              >
                <input
                  type={"checkbox"}
                  id={item.id}
                  //checked={item.checked}
                  className="mt-0.5"
                ></input>
                <label htmlFor={item.id} className="flex-1">
                  {item.name}
                </label>
              </div>
            );
          })}
          <button className="bg-[#866ce7e9] mt-2 rounded-md text-white text-xs p-1.5 w-full">
            新增/編輯待辦事項
          </button>
        </div>
      )}
    </div>
  );
};
