import React from 'react'

function Loading() {
  return (
    <div className='w-full flex justify-center items-center py-1'>
        <div className='spin border-[4px] w-[30px] h-[30px] rounded-full border-transparent border-t-myForeground border-solid animate-spin'></div>
    </div>
  )
}

export default Loading