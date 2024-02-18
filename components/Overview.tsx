"use client";

import { Liff } from "@line/liff";
import { useEffect, useState } from "react";

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
    setAccessToken(accessToken || "");
  }, [liff]);
  return (
    <>
      <h1>工事中...</h1>
      <p className="overflow-hidden">accessToken : {accessToken}</p>
    </>
  );
};
