'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default async function Index() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkLoggedIn() {
      const { error } = await supabase.auth.getUser()

      if (!error) {
        router.push('/dashboard')
      }
    }

    checkLoggedIn()
  }, [])

  return (
   <div>
    Logged out user
   </div>
  );
}
