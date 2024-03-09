"use client";

import { Liff } from "@line/liff";
import { useEffect, useReducer, useState } from "react";
import { Statistic } from "./Statistic";
import { TagSet } from "./TagSet";
import { Pagination } from "./Pagination";
import { TourCards } from "./TourCards";

type dataSetting = {
  filterTarget: "duration" | "priority" | "none";
  filterOperator: "gt" | "gte" | "equal" | "lte" | "lt" | "none";
  filterInput: number;
  sortingTarget: "duration" | "-duration" | "priority" | "-priority" | "none";
  currentPage: number;
  countPerPage: number;
};

type StatisticResponse = {
  avgDuration: number;
  maxDuration: number;
  minDuration: number;
  todoCount: number;
};

const reducer = <T,>(state: T, action: Partial<T>) => {
  return { ...state, ...action };
};

const fetchStatsData = async (): Promise<StatisticResponse> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    },
  };
  const res = await fetch(
    "https://travel-helper-server.onrender.com/api/v1/tours/stats",
    options
  );
  const { data } = await res.json();
  return data.stats[0];
};

export const Overview = ({ liff }: { liff: Liff | null }) => {
  const [accessToken, setAccessToken] = useState("");
  const [dataSettingState, dispatchDataSetting] = useReducer(
    reducer<dataSetting>,
    {
      filterTarget: "none",
      filterOperator: "none",
      filterInput: 0,
      sortingTarget: "none",
      currentPage: 1,
      countPerPage: 6,
    }
  );
  const [statistic, setStatistic] = useState<StatisticResponse>({
    avgDuration: 0,
    maxDuration: 0,
    minDuration: 0,
    todoCount: 0,
  });
  useEffect(() => {
    const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
    setAccessToken(accessToken || "");
    const fetchData = async () => {
      const response = await fetchStatsData();
      setStatistic(response);
    };
    fetchData();
  }, [liff]);
  return (
    <>
      <Statistic data={statistic} />
      <TagSet />
      <Pagination />
      <TourCards />
    </>
  );
};
