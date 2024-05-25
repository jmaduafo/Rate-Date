import React from 'react'
import { Skeleton } from './ui/skeleton'

function RecommendedSkeleton() {
  return (
    <div className={`py-3 px-2`}>
      <div className="">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[40px] h-[40px] rounded-full animate-skeleton" />
          <div className="flex-[1]">
            <Skeleton className="w-[50%] h-3 rounded-md animate-skeleton" />
            <Skeleton className="w-[40%] h-3 rounded-md animate-skeleton mt-1" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Skeleton className="h-3 w-full rounded-md animate-skeleton" />
        <Skeleton className="h-3 w-[60%] rounded-md animate-skeleton mt-1" />
      </div>
      <div className="mt-2">
        <div className="">
          <Skeleton className="h-3 w-[35%] rounded-md animate-skeleton" />
        </div>
      </div>
    </div>
  )
}

export default RecommendedSkeleton