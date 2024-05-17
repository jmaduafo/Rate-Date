'use client'
import React, { useState, useEffect } from 'react'
import Card from '@/components/Card'
import DemographicChart from './DemographicChart'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps } from "@/types/type";

function RightBar() {
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
    <section>
        <Card className='w-full flex justify-center items-center'>
            <DemographicChart ethnicData={ethnicData}/>
        </Card>
        <Card className='w-full mt-5'>

        </Card>
    </section>
  )
}

export default RightBar