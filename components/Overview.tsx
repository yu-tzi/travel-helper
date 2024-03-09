"use client";

import { Liff } from "@line/liff";
import { useEffect, useState } from "react";
import { Statistic } from "./Statistic";
import { TagSet } from "./TagSet";
import { Pagination } from "./Pagination";
import { TourCards } from "./TourCards";

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
    setAccessToken(accessToken || "");
  }, [liff]);
  return (
    <>
      <Statistic />
      <TagSet />
      <Pagination />
      <TourCards />
    </>
  );
};
