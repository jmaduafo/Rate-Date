import React from 'react'

function Container({ children }: { readonly children: React.ReactNode}) {
  return (
    <div className='relative flex-[5] mx-5 mt-10 md:mb-10 mb-[8rem] duration-500 bodyScroll'>{children}</div>
  )
}

export default Container