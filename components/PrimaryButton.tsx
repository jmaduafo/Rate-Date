import React from 'react'


type PrimaryProps = {
    children: React.ReactNode;
    className: string;
    actionFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function PrimaryButton({children, className, actionFunction}: PrimaryProps) {
  return (
    <button onClick={actionFunction}
    className={`${className} border-[1px] duration-[.4s] hover:opacity-80 border-darkText text-lightText rounded-xl py-2 px-5 bg-darkText outline-none`}>
        {children}
    </button>
  )
}

export default PrimaryButton