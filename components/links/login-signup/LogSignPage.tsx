import React from 'react'

function LogSignPage({children}: { children: React.ReactNode}) {
  return (
    <div className='md:flex'>
        <div className='md:flex-[2] md:block hidden'></div>
        <div className='md:bg-foreground md:flex-[1] flex justify-center items-center'>
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default LogSignPage