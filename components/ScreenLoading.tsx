import React from 'react'

function ScreenLoading() {
  return (
    <div className='fixed z-[100] top-0 left-0 w-full h-screen bg-dark10 flex justify-center items-center'>
        <div className='animate-spinner border-[3px] w-[40px] h-[40px] rounded-full border-transparent border-t-myForeground border-solid'></div>
    </div>
  )
}

export default ScreenLoading