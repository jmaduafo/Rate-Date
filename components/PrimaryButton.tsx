import React from 'react'


type PrimaryProps = {
    children: React.ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined; 
    actionFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function PrimaryButton({children, className, type, actionFunction}: PrimaryProps) {
  return (
    <button onClick={actionFunction}
    type={type}
    className={`${className} border-[1px] duration-500 hover:opacity-80 border-darkText text-lightText rounded-xl py-2 px-5 bg-darkText outline-none`}>
        {children}
    </button>
  )
}

export default PrimaryButton