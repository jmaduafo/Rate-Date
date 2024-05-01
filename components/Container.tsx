import React from 'react'

function Container({ children }: { readonly children: React.ReactNode}) {
  return (
    <div className='flex-[5]'>{children}</div>
  )
}

export default Container