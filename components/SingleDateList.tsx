import React from 'react'

function SingleDateList({children}: { children: React.ReactNode}) {
  return (
    <div className='flex justify-between items-center w-full px-4 py-3 shadow-md rounded-2xl'>
        {children}
    </div>
  )
}

export default SingleDateList