"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Gif from "@/app/bubble-gum-error-404.gif";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

function NotFound() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const checkLoggedIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.getUser();

    if (error) {
      setLoggedIn(false);
      setLoading(false);
    } else {
      setLoggedIn(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className={`h-screen flex justify-center items-center`}>
      <div
        className={`w-full ${
          loggedIn && loggedIn === true
            ? "pb-16"
            : loggedIn && loggedIn === false
            ? "pb-[15vh]"
            : null
        }`}
      >
        {loading || loggedIn === undefined ? (
          <div className="flex justify-center gap-5">
            <div className="w-3 h-3 rounded-full bg-homeText animate-ping1"></div>
            <div className="w-3 h-3 rounded-full bg-homeText animate-ping2"></div>
            <div className="w-3 h-3 rounded-full bg-homeText animate-ping3"></div>
          </div>
        ) : (
          <div
            className={`w-full ${loggedIn ? "text-darkText" : "text-homeText"}`}
          >
            {/* <div className="w-[40%] object-cover mx-auto duration-500">
              <Image src={Gif} alt="404 error gif" className="w-full h-full" />
            </div> */}
            {(loggedIn && loggedIn === true) || loggedIn === false ? (
              <>
                <h1 className="text-[16vh] text-center leading-[1] tracking-tighter font-bold">
                  404
                </h1>
                <p className="text-center font-semibold text-[18px]">
                  Oh no! Page not found
                </p>
                <div className="flex justify-center text-[14px]">
                  <p className="text-center w-[50%]">
                    You may have typed in the incorrect address or the page has
                    been moved.
                  </p>
                </div>
                {loggedIn ? (
                  <div className="flex justify-center mt-8">
                    <Link href="/dashboard">
                      <PrimaryButton>Go To Dashboard</PrimaryButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center mt-8">
                    <Link href="/">
                      <PrimaryButton>Go Home</PrimaryButton>
                    </Link>
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotFound;
