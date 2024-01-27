"use client";

import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { format, isBefore, isSameDay } from "date-fns";
import { HiOutlineClock, HiOutlinePlusSm } from "react-icons/hi";
import tours from "../data/tours.json";
import { useMemo } from "react";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
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
    <div>
      <Head>
        <title>Travel helper - planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-br from-[#c5d9f2] from-10% to-[#e9cbcf] to-90% h-[100vh]">
        <div className="max-w-[375px] bg-white w-[50vh] h-[90vh] m-auto relative top-[4vh] rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] px-5 py-4 tracking-wide">
          {liff?.isLoggedIn() && !liffError ? (
            <button
              className="bg-gray-400 hover:bg-gray-200 text-white font-sm py-2 px-4 rounded w-40 m-auto"
              onClick={async () => {
                const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
                // 把 token 傳給後端以確認使用者認證
              }}
            >
              call get tours api
            </button>
          ) : (
            <div className="flex flex-col justify-start gap-5">
              <div className="flex flex-row items-center justify-between">
                <div className="font-bold my-1">Travel Planner</div>
                <div className="flex flex-row items-center text-sm font-bold px-6 py-3 rounded-full bg-[#866ce7e9] text-white">
                  <HiOutlinePlusSm size={20} />
                  Add
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400">TODAY</div>
                <div className="text-slate-800">
                  {format(new Date(), "E dd LLL yyyy")}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400 mb-2">
                  JOURNEY
                </div>
                <div className="overflow-scroll h-[60vh] py-1 snap-y">
                  <div className="relative">
                    <div className="h-full w-1 bg-[#866ce7e9] absolute top-0 left-6"></div>
                    {formattedTours.map((tour) => {
                      return (
                        <div
                          key={tour.id}
                          className={`flex flex-row items-center snap-start ${
                            tour.isFirstShowDate
                              ? "justify-between"
                              : "justify-end"
                          }`}
                        >
                          {tour.isFirstShowDate && (
                            <div className="relative rounded-full border-[3px] bg-white border-[#866ce7e9] h-12 w-12 flex justify-center items-center">
                              <div className="text-sm text-[#866ce7e9]">
                                {format(new Date(tour.timestamp), "MM/dd")}
                              </div>
                            </div>
                          )}
                          <div className="bg-white text-[#866ce7e9] border-2 border-neutral-200 w-48 h-18 rounded-md mb-3 flex flex-col justify-start pt-1.5 pb-2 px-2">
                            <div className="text-sm font-medium truncate">
                              {tour.name}
                            </div>
                            <div className="text-xs opacity-80">
                              {isBefore(new Date(tour.timestamp), new Date())
                                ? "upcoming"
                                : "passed"}
                            </div>
                            <div className="flex flex-row justify-end items-center gap-1">
                              <HiOutlineClock />
                              <div className="text-xs">
                                {format(new Date(tour.timestamp), "HH:mm")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/*
                <button
                  className="bg-gray-400 hover:bg-gray-200 text-white font-sm py-2 px-4 rounded w-40 m-auto"
                  onClick={() => {
                    if (!liff?.isLoggedIn()) {
                      liff?.login();
                    }
                  }}
                >
                  {liff?.isLoggedIn() ? "Already LogIn" : "LINE login"}
                </button>
              */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
