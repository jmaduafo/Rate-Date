import React from 'react'

function LogSignPage({children}: { children: React.ReactNode}) {
  return (
    <div className='md:flex min-h-screen'>
        <div className='md:flex-[1] md:block hidden'></div>
        <div className='md:bg-myForeground md:flex-[2] flex justify-center items-center md:rounded-tl-3xl md:rounded-bl-3xl'>
            <div className='w-[50%]'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default LogSignPage