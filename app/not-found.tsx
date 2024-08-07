import CheckNav from "@/components/CheckNav";
import Navbar from "@/components/links/home/Navbar";
import React from "react";

function NotFound() {
  return (
    <>
      <CheckNav/>
      <div className={`h-screen flex justify-center items-center`}>
        <div
          className={`w-full pb-16
    }`}
        >
          <div className={`w-full text-darkText`}>
            {/* <div className="w-[40%] object-cover mx-auto duration-500">
              <Image src={Gif} alt="404 error gif" className="w-full h-full" />
            </div> */}
            <h1 className="text-[16vh] text-center leading-[1] tracking-tighter font-bold">
              404
            </h1>
            <p className="text-center font-semibold text-[18px]">
              Oh no! Page not found
            </p>
            <div className="flex justify-center text-[14px]">
              <p className="text-center w-[50%]">
                You may have typed in the incorrect address or the page has been
                moved.
              </p>
            </div>
            {/* { window.location.pathname === "/" ? (
              <div className="flex justify-center mt-8">
                <Link href="/">
                  <PrimaryButton>Go Home</PrimaryButton>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center mt-8">
                <Link href="/dashboard">
                  <PrimaryButton>Go To Dashboard</PrimaryButton>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
