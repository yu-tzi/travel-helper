"use client";

import { Liff } from "@line/liff";
import { format, isSameDay } from "date-fns";
import tours from "../data/tours.json";
import { useMemo, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { TourCard } from "./TourCard";

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [selectBlock, setSelectBlock] = useState("");
  const formattedTours = useMemo(() => {
    let date = tours[0].timestamp;
    return tours.map((tour, index) => {
      const isFirstShowDate =
        !isSameDay(new Date(tour.timestamp), new Date(date)) || index === 0;
      date = tour.timestamp;
      return {
        ...tour,
        isFirstShowDate,
      };
    });
  }, []);
  return (
    <div className="flex flex-col justify-start gap-5">
      {/* header */}
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold my-1">Travel Planner</div>
        <div className="flex flex-row items-center text-sm font-bold px-6 py-3 rounded-full bg-[#866ce7e9] text-white">
          <HiOutlinePlusSm size={20} />
          Add
        </div>
      </div>
      {/* today */}
      <div>
        <div className="text-xs font-medium text-slate-400">TODAY</div>
        <div className="text-slate-800">
          {format(new Date(), "E dd LLL yyyy")}
        </div>
      </div>
      {/* journey */}
      <div>
        <div className="text-xs font-medium text-slate-400 mb-2">JOURNEY</div>
        <div className="overflow-scroll h-[60vh] py-1 snap-y bg-contain bg-opacity-80 bg-[url('/map.png')]">
          <div className="relative mx-1">
            <div className="h-full w-1 bg-[#866ce7e9] absolute top-0 left-6"></div>
            {formattedTours.map((tour) => {
              return (
                <div
                  key={tour.id}
                  className={`flex flex-row items-center snap-start ${
                    tour.isFirstShowDate ? "justify-between" : "justify-end"
                  }`}
                >
                  {/* 左半邊時間線 */}
                  {tour.isFirstShowDate && (
                    <div className="relative rounded-full border-[3px] bg-white border-[#866ce7e9] h-12 w-12 flex justify-center items-center">
                      <div className="text-sm text-[#866ce7e9]">
                        {format(new Date(tour.timestamp), "MM/dd")}
                      </div>
                    </div>
                  )}
                  {/* 右半邊行程卡 */}
                  <TourCard
                    selectBlock={selectBlock}
                    setSelectBlock={setSelectBlock}
                    tour={tour}
                  />
                </div>
              );
            })}
          </div>
          {/* TODO: 拔掉這顆寄生的按鈕 */}
          <button
            className="bg-gray-400 text-white font-sm py-2 px-4 rounded w-40 m-auto"
            onClick={() => {
              const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
              // TODO: 把 token 傳給後端以確認使用者認證
            }}
          >
            call get tours api
          </button>
        </div>
      </div>
    </div>
  );
};
