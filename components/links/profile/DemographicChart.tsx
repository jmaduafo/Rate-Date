"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps } from "@/types/type";
import { PieChart, Pie, Tooltip } from "recharts";
import Loading from "@/components/Loading";

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

          array.push({ ...list, ethnicityCount: filterCount });
        });

        // SETS A UNIQUE OBJECT ARRAY BASED ON THE ETHNICITY
        setEthnicData([
          ...new Map(array.map((item) => [item["ethnicity"], item])).values(),
        ]);
      }
    }
  }

  useEffect(() => {
    getEthnicities();
  }, []);

  return (
    <div>
      {ethnicData ? (
        <PieChart width={700} height={700} style={{ scale: 0.4 }}>
          <Tooltip />
          <Pie
            data={ethnicData}
            dataKey="ethnicityCount"
            outerRadius={250}
            innerRadius={150}
            fill="gray"
            label={({ ethnicity }) => `${ethnicity}`}
          />
        </PieChart>
      )
      :
      <Loading classNameColor="border-t-darkText60" classNameSize="w-8 h-8"/> }
    </div>
  );
}

export default DemographicChart;
