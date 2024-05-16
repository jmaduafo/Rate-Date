"use client";
import React from "react";
import { ScheduleChartDataProps } from "@/types/type";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header4 from "@/components/Header4";
import Loading from "@/components/Loading";
import QuestionPopUp from "@/components/QuestionPopUp";

type ChartProps = {
  setChartData?: React.Dispatch<
    React.SetStateAction<ScheduleChartDataProps[] | undefined>
  >;
  setChartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  chartLoading?: boolean;
  chartData?: ScheduleChartDataProps[] | undefined;
};

function ScheduleBarChart({ chartData }: ChartProps) {
  return (
    <>
      {chartData && chartData?.length ? (
        <div className="w-full h-full">
          <div className="flex justify-between gap-2 items-center">
            <Header4 title="Scheduled Dates" />
            <QuestionPopUp description="Evaluates how often you date and how active you are in the dating scene.">
              <div className="cursor-pointer w-5 h-5 border-darkText border-[1.5px] rounded-full flex justify-center items-center">
                <p className={`font-medium text-[13px]`}>?</p>
              </div>
            </QuestionPopUp>
          </div>
          <div className="w-full mt-3">
            <ResponsiveContainer width={"100%"} minHeight={200}>
              <BarChart data={chartData}>
                <CartesianGrid
                  stroke="hsl(var(--muted))"
                  strokeDasharray="3 3"
                />
                <XAxis dataKey="date_schedule" style={{ fontSize: "13px" }} />
                {/* <YAxis allowDecimals={false} style={{ fontSize: '13px'}}/> */}
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, .03)" }} />
                <Bar
                  dataKey="date_schedule_count"
                  barSize={20}
                  type="monotone"
                  fill="#CEC7C7"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : chartData && !chartData?.length ? (
        <div>
          <p>Hi</p>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loading
            classNameColor="border-t-darkText60"
            classNameSize="w-16 h-16"
          />
        </div>
      )}
    </>
  );
}

export default ScheduleBarChart;
