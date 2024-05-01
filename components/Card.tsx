import React from 'react'

function Card({children, className}: {children: React.ReactNode, className: string}) {
  return (
    <div className={`bg-foreground text-darkText rounded-3xl ${className}`}>
        {children}
    </div>
  )
}

export default Card