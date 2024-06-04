import React from 'react'
import Link from 'next/link'

type SecondaryProps = {
    children: React.ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined; 
    actionFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function SecondaryButton({children, className, type, actionFunction}: SecondaryProps) {
  return (
    <button type={type} onClick={actionFunction}
    className={`border-[1px] duration-500 hover:opacity-80 border-darkText text-darkText rounded-xl py-2 px-5 bg-transparent outline-none ${className} `}>
        {children}
    </button>
  )
}

export default SecondaryButton