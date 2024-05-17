import React from "react";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import Header4 from "@/components/Header4";
import { Skeleton } from "@/components/ui/skeleton";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import QuestionPopUp from "@/components/QuestionPopUp";
import { EthnicDataProps } from "@/types/type";

type EthnicProps = {
  ethnicData: EthnicDataProps[] | undefined;
};

function DemographicChart({ ethnicData }: EthnicProps) {
  return (
    <div className="w-full">
      {ethnicData && ethnicData?.length ? (
        <div className="z-[0]">
          <div className="flex justify-between gap-2 items-start">
            <Header4 title="Dates by Ethnicity" />
            <QuestionPopUp description="The purpose of this chart is to evaluate how you date and what your dating preferences are. Keep in mind that everyone is attracted to different things and what you're drawn to is valid as long as it's legal.">
              <div className="cursor-pointer w-5 h-5 border-darkText border-[1.5px] rounded-full flex justify-center items-center">
                <p className="text-[14px] font-medium">?</p>
              </div>
            </QuestionPopUp>
          </div>
          <div>
            <ResponsiveContainer width={"100%"} minHeight={200}>
              <PieChart>
                <Tooltip />
                <Pie
                  data={ethnicData}
                  dataKey="ethnicityCount"
                  nameKey="ethnicity"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  style={{
                    fontSize: "10px",
                  }}
                  paddingAngle={3}
                  type="monotone"
                  fill="#CEC7C7"
                  // label={({ ethnicity }) => `${ethnicity}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : ethnicData && !ethnicData?.length ? (
        <div className="my-14">
          <div className="flex justify-center items-center">
            <p className="w-[70%] text-[15px] text-center mb-5">
              Create past or current dates to get a data chart
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Link href={"/dashboard/create"}>
              <PrimaryButton>Create a Date</PrimaryButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Skeleton className="w-[80%] h-6 rounded animate-skeleton" />
          <div className="flex justify-center items-center my-8">
            <Skeleton className="w-[11vw] h-[11vw] rounded-full animate-skeleton" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DemographicChart;
