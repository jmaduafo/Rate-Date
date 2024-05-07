import React, { forwardRef } from 'react'

type DateProps = {
  className?: string;
  children: React.ReactNode
}

// HAS TO BE SET UP AS A REF TO USE SHADCN UI DIALOG COMPONENT
// export const SingleDateList =  React.forwardRef<HTMLDivElement, DateProps>((props, ref) => (
//     <div ref={ref} className={`flex justify-between items-center w-full px-4 py-3 shadow-md rounded-2xl ${props.className}`}>
//         {props.children}
//     </div>
// ))

function SingleDateList({children, className}: DateProps) {
  return (
    <div className={`flex justify-between items-center w-full px-4 py-3 shadow-md rounded-2xl ${className}`}>
        {children}
    </div>
  )
}

export default SingleDateList


// export default SingleDateList