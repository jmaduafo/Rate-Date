import React from 'react'

function Loading() {
  return (
    <div className='w-full justify-center items-center'>
        <div className='border-[8px] rounded-full border-transparent border-t-myForeground  border-solid animate-spin'></div>
    </div>
  )
}

export default Loading