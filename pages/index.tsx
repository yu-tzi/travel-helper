"use client";

import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { Welcome } from "../components/Welcome";
import { Overview } from "../components/Overview";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      {/* document information */}
      <Head>
        <title>Travel helper - planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main content */}
      <main className="bg-gradient-to-br from-[#c5d9f2] from-10% to-[#e9cbcf] to-90% h-[100vh]">
        <div className="max-w-[375px] bg-white w-[50vh] h-[90vh] m-auto relative top-[4vh] rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] px-5 py-4 tracking-wide">
          {/* TODO: always true 替換成 liff?.isLoggedIn() && !liffError ... */}
          {true ? <Overview liff={liff} /> : <Welcome liff={liff} />}
        </div>
      </main>
    </div>
  );
};

export default Home;
