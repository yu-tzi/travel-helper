"use client";

import type { Liff } from "@line/liff";

export const Welcome = ({ liff }: { liff: Liff | null }) => {
  return (
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
  );
};
