import React, { Fragment } from "react";
import { Skeleton } from "./ui/skeleton";

function CollectionCardSkeleton() {
  return (
    <div className={`py-5 px-4`}>
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
      <div className="mt-2">
        <Skeleton className="h-6 w-[90px] rounded-md animate-skeleton mt-2" />
        <Skeleton className="h-5 w-[70px] rounded-md animate-skeleton mt-2" />
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((tag) => {
            return (
              <Fragment key={tag}>
                <Skeleton className="h-5 w-[60px] rounded-md animate-skeleton" />
              </Fragment>
            );
          })}
        </div>
        <Skeleton className="h-5 w-[50px] rounded-md animate-skeleton" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-5 w-full rounded-md animate-skeleton" />
        <Skeleton className="h-5 w-[60%] rounded-md animate-skeleton mt-1" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-5">
          <Skeleton className="h-5 w-[50px] rounded-md animate-skeleton" />
          <Skeleton className="h-5 w-[55px] rounded-md animate-skeleton" />
          <Skeleton className="h-5 w-[45px] rounded-md animate-skeleton" />
        </div>
        <Skeleton className="h-5 w-[20px] rounded-md animate-skeleton" />
      </div>
    </div>
  );
}

export default CollectionCardSkeleton;
