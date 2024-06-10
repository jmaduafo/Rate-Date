import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Picture from '@/app/logSignGif.gif'
import SecondaryButton from '@/components/SecondaryButton'

function LogSignPage({children, topRightLabel, link}: { children: React.ReactNode, topRightLabel: string, link: string}) {
  return (
    <div className='md:flex min-h-screen shadow-md'>
        <div className='md:flex-[1] hidden p-8 md:flex justify-center items-center'>
            {/* Illustration by <a href="https://icons8.com/illustrations/author/N3YOxdn12Kox">Marina Mogulska</a> from <a href="https://icons8.com/illustrations">Ouch!</a> */}
            <div className='w-full object-cover object-bottom'>
                <Image
                    src={Picture}
                    alt='animated chill blue laptop'
                    className='w-full h-full'/>
            </div>
        </div>  
        <div className='md:bg-myForeground md:flex-[1] md:rounded-tl-3xl md:rounded-bl-3xl p-8'>
            <div className='flex justify-end gap-4'>
                <Link href={link}>
                    <PrimaryButton className=''>
                        {topRightLabel}
                    </PrimaryButton>
                </Link>
                <Link href={'/'}>
                    <SecondaryButton className=''>
                        Back to Home
                    </SecondaryButton>
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