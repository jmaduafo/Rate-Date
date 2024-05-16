"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps } from "@/types/type";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import Loading from "@/components/Loading";
import Header4 from "@/components/Header4";

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

        console.log(newArray);
      }
    }
  }

  useEffect(() => {
    getEthnicities();
  }, []);

  return (
    <div className="w-full">
      <Header4 title="Dates by Ethnicity"/>
      {ethnicData ? (
        <div className="z-[0] my-5">
          <ResponsiveContainer width={'100%'} minHeight={200} >
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
                  fontSize: '10px'
                }}
                paddingAngle={3}
                type="monotone"
                fill="#CEC7C7"
                // label={({ ethnicity }) => `${ethnicity}`}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* <div className="flex justify-end mt-6">
            <div>
            {
              ethnicData?.map(data => {
                return (
                  <div key={data.ethnicity}>
                    <p className="text-right text-[14px]">{data.ethnicity}</p>
                  </div>
                )
              })
            }
            </div>
          </div> */}
        </div>
      ) : (
        <Loading classNameColor="border-t-darkText60" classNameSize="w-8 h-8" />
      )}
    </div>
  );
}

export default DemographicChart;
