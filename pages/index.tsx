"use client";

import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { format } from "date-fns";
import { HiOutlinePlusSm } from "react-icons/hi";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
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
              <div className="text-xs font-medium text-slate-400">JOURNEY</div>
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
