"use client";

import { Liff } from "@line/liff";
import { useEffect, useReducer, useState } from "react";
import { Statistic } from "./Statistic";
import { TagSet } from "./TagSet";
import { Pagination } from "./Pagination";
import { TourCards } from "./TourCards";

type TourResponse = {
  _id: string;
  date: string;
  duration: number;
  priority: number;
  name: string;
  todo: any[];
  formattedDate: string;
  id: string;
};

type DataSetting = {
  filterTarget?: "duration" | "priority" | "none";
  filterOperator?: "gt" | "gte" | "equal" | "lte" | "lt" | "none";
  filterInput?: number;
  sortingTarget?: "duration" | "-duration" | "priority" | "-priority" | "none";
  currentPage?: number;
  countPerPage?: number;
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

const fetchTourData = async (
  props: DataSetting = {}
): Promise<TourResponse[]> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    },
  };
  const res = await fetch(
    "https://travel-helper-server.onrender.com/api/v1/tours/",
    options
  );
  const { data } = await res.json();
  return data.tours;
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
    reducer<DataSetting>,
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
  const [tours, setTours] = useState<TourResponse[] | []>([]);
  useEffect(() => {
    const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
    setAccessToken(accessToken || "");
    const fetchData = async () => {
      const statsResponse = await fetchStatsData();
      const toursResponse = await fetchTourData();
      console.log(toursResponse);
      setStatistic(statsResponse);
      setTours(toursResponse);
    };
    fetchData();
  }, [liff]);
  return (
    <>
      <Statistic data={statistic} />
      <TagSet state={dataSettingState} dispatch={dispatchDataSetting} />
      <Pagination />
      <TourCards />
    </>
  );
};
