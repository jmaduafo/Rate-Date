import React from 'react'

function Container({ children }: { readonly children: React.ReactNode}) {
  return (
    <div className='flex-[5] mx-5 mt-10 duration-[.4s]'>{children}</div>
  )
}

export default Container