import React from 'react'

function Header3({ title }: { title: string}) {
  return (
    <h3 className='text-[24px] font-medium tracking-tight'>{title}</h3>
  )
}

export default Header3