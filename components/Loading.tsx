import React from 'react'

function Loading() {
  return (
    <div className='w-full flex justify-center items-center py-0 px-4'>
        <div className='animate-spinner border-[3px] w-[25px] h-[25px] rounded-full border-transparent border-t-myForeground border-solid'></div>
    </div>
  )
}

export default Loading