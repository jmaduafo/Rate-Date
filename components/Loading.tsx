import React from 'react'

function Loading({ classNameColor, classNameSize }: { classNameColor: string, classNameSize: string}) {
  return (
    <div className='w-full flex justify-center items-center py-0 px-4'>
        <div className={`animate-spinner border-[4px] w-[25px] h-[25px] ${classNameSize} ${classNameColor} rounded-full border-transparent border-t- border-solid`}></div>
    </div>
  )
}

export default Loading