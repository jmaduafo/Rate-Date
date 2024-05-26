import React, { Fragment } from "react";
import { Skeleton } from "./ui/skeleton";

function CollectionCardSkeleton() {
  return (
    <div className={`py-5`}>
      <div className="">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[40px] h-[40px] rounded-full animate-skeleton" />
          <div className="">
            <Skeleton className="w-[100px] h-5 rounded-md animate-skeleton" />
            <Skeleton className="w-[50px] h-5 rounded-md animate-skeleton mt-1" />
          </div>
        </div>
      </div>
      <div className="">
        <Skeleton className="w-full h-[45vh] rounded-md animate-skeleton mt-4" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-5 w-[45%] rounded-md animate-skeleton" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-5 w-full rounded-md animate-skeleton" />
        <Skeleton className="h-5 w-[60%] rounded-md animate-skeleton mt-1" />
      </div>
      <div className="mt-2">
        <div className="">
          <Skeleton className="h-5 w-[35%] rounded-md animate-skeleton" />
        </div>
        {/* <Skeleton className="h-5 w-[25%] rounded-md animate-skeleton" /> */}
      </div>
    </div>
  );
}

export default CollectionCardSkeleton;
