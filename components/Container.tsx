import React from 'react'

function Container({ children }: { readonly children: React.ReactNode}) {
  return (
    <div className='flex-[5] mx-5 mt-10 md:mb-3 mb-[8rem] duration-500'>{children}</div>
  )
}

export default Container