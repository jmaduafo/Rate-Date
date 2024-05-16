"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps } from "@/types/type";
import { PieChart, Pie, Tooltip } from "recharts";

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
          const someOccur = data?.some((el) => el.ethnicity === list.ethnicity);

          if (someOccur) {
            array.forEach((k) => {
              if (k.ethnicity === list.ethnicity && k.ethnicityCount) {
                k['ethnicityCount']++
              }
            });
          } else {
            let a: EthnicDataProps= {...list};
            // a['id'] = list.id
            // a['user_id'] = list.user_id
            // a['ethnicity'] = list.ethnicity
            a['ethnicityCount'] = 1;
            array.push(a);

          }

          // const filterCount = data?.filter(
          //   (el) => el.ethnicity === list.ethnicity
          // ).length;
        });

        // let obj = new Set(array)
        console.log(array)
        setEthnicData(array);
      }
    }
  }

  useEffect(() => {
    getEthnicities();
  }, []);

  return (
    <div>
      {ethnicData &&
        ethnicData?.map((data) => {
          return (
            <p key={data.id}>
              {data.ethnicity} {data.ethnicityCount}
            </p>
          );
        })}
    </div>
  );
}

export default DemographicChart;
