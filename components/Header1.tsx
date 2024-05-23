import React from 'react'

function Header1({title}: { title: string }) {
  return (
    <h1 className='text-[32px] font-bold tracking-tight '>{title}</h1>
  )
}

export default Header1