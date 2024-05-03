import React from 'react'
import LineBreak from './LineBreak'

function CreateEditCard({ children, title, description }: { children: React.ReactNode, title: string, description?: string}) {
  return (
    <>
        <div className='flex md:flex-row flex-col gap-4 md:justify-between md:items-start py-4 text-darkText'>
            <div className='flex-[1]'>
                <p className='font-medium'>{title}</p>
                <p className='text-darkText60 text-[13px]'>{description}</p>
            </div>
            <div className='flex-[2] text-darkText'>
                {children}
            </div>
        </div>
        <LineBreak/>
    </>
  )
}

export default CreateEditCard