import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'
import React from 'react'

function LogSignPage({children, topRightLabel, link}: { children: React.ReactNode, topRightLabel: string, link: string}) {
  return (
    <div className='md:flex min-h-screen shadow-md'>
        <div className='md:flex-[1] md:block hidden p-8'></div>
        <div className='md:bg-myForeground md:flex-[1] md:rounded-tl-3xl md:rounded-bl-3xl p-8'>
            <div className='flex justify-end'>
                <Link href={link}>
                    <PrimaryButton className=''>
                        {topRightLabel}
                    </PrimaryButton>
                </Link>

            </div>
            <div className='flex justify-center items-center min-h-[80vh]'>
                <div className='xl:w-[50%] md:w-[65%] sm:w-[60%] xs:w-[80%] w-[90%]'>
                    {children}
                </div>
            </div>

        </div>
    </div>
  )
}

export default LogSignPage