import React from 'react'

function Card({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <div className={`bg-myForeground p-4 md:p-5 text-darkText rounded-3xl ${className}`}>
        {children}
    </div>
  )
}

export default Card