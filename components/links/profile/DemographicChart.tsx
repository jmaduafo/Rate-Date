"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps } from "@/types/type";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import Loading from "@/components/Loading";
import Header4 from "@/components/Header4";
import { Skeleton } from "@/components/ui/skeleton";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

function DemographicChart() {
  const [ethnicData, setEthnicData] = useState<EthnicDataProps[] | undefined>();

  const supabase = createClient();
  const router = useRouter();

  async function getEthnicities() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      router.push("/login");
    } else {
      const { data, error } = await supabase
        .from("dates")
        .select("id, user_id, ethnicity, date_name")
        .neq("ethnicity", "Don't know")
        .eq("user_id", userData?.user?.id);

      if (error) {
        console.error(error.message);
      } else {
        let array: EthnicDataProps[] = [];

        data?.forEach((list, i) => {
          const filterCount = data?.filter(
            (el) => el.ethnicity === list.ethnicity
          ).length;

          array.push({
            ethnicity: list.ethnicity,
            ethnicityCount: filterCount,
          });
        });

        const newArray = [
          ...new Map(array.map((item) => [item["ethnicity"], item])).values(),
        ];

        // SETS A UNIQUE OBJECT ARRAY BASED ON THE ETHNICITY
        setEthnicData(newArray);
      }
    }
  }

  useEffect(() => {
    getEthnicities();
  }, []);

  return (
    <div className="w-full">
      {ethnicData && ethnicData?.length ? (
        <div className="z-[0]">
          <Header4 title="Dates by Ethnicity" />
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
