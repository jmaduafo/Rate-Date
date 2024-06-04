import About from "@/components/links/home/About";
import Hero from "@/components/links/home/Hero";
import Navbar from "@/components/links/home/Navbar";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default async function Index() {
  const supabase = createClient()
  // const router = useRouter()

  // useEffect(() => {
  //   async function checkLoggedIn() {
  //     const { error } = await supabase.auth.getUser()

  //     if (!error) {
  //       router.push('/dashboard')
  //     }
  //   }

  //   checkLoggedIn()
  // }, [])

  return (
   <div className="bg-homeBackground text-homeText">
    <Navbar/>
    <Hero/>
    <About/>
   </div>
  );
}
