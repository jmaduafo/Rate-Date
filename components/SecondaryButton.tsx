import React from 'react'
import Link from 'next/link'

type SecondaryProps = {
    children: React.ReactNode;
    className: string;
    actionFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function SecondaryButton({children, className, actionFunction}: SecondaryProps) {
  return (
    <button onClick={actionFunction}
    className={`${className} border-[1px] duration-500 hover:opacity-80 border-darkText text-darkText rounded-xl py-2 px-5 bg-transparent outline-none`}>
        {children}
    </button>
  )
}

export default SecondaryButton