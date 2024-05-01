'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LineBreak from './LineBreak'
import { HomeIcon, ChartBarIcon, QueueListIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon as LogoutIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

function SideBar() {
    const pathname = usePathname()

    const navigations = [
        {
            name: 'Dashboard',
            icon: <HomeIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
            link: '/dashboard'
        },
        {
            name: 'Charts',
            icon: <ChartBarIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
            link: '/charts'
        },
        {
            name: 'Wishlist',
            icon: <QueueListIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
            link: '/wishlist'
        },
        {
            name: 'Profile',
            icon: <UserCircleIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
            link: '/profile'
        },
        {
            name: 'Logout',
            icon: <LogoutIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
            link: '/login'
        },
    ]

  return (
    <>
    <div className='gap-6 items-center md:flex hidden'>
        <div className='w-[50px] h-[50px] bg-foreground rounded-full'></div>
        <div>
            <p className='text-[14px] md:mb-[-5px]'>Good morning,</p>
            <p className='text-[14px]'>Gianna</p>
        </div>
    </div>
    <nav className='md:mt-[8rem] md:block w-full flex flex-row justify-evenly items-center'>
        {navigations.map(nav => {
            return (
                <Link key={nav.name} href={nav.link}>
                    <div className={`${pathname.slice(1) === nav.name.toLowerCase() ? 'md:bg-background md:shadow-3xl rounded-2xl' : 'md:bg-transparent text-text60'} group duration-[.4s] md:py-3 md:px-8 md:mb-2 flex md:flex-row md:items-center md:justify-start md:gap-6 flex-col justify-center items-center`}>
                        {/* CHANGES ICON COLOR BASED ON PATHNAME */}
                        <div className={`${pathname.slice(1) === nav.name.toLowerCase() ? 'md:text-darkText text-lightText' : 'group-hover:text-darkText md:text-darkText60 text-lightText60 duration-[.4s]'}`}>
                            {nav.icon}
                        </div>
                        {/* CHANGES TEXT COLOR BASED ON PATHNAME */}
                        <div className=''>
                            <p className={`${pathname.slice(1) === nav.name.toLowerCase() ? 'md:text-darkText text-lightText' : 'group-hover:md:text-darkText group-hover:text-lightText md:text-darkText60 text-lightText60'} duration-[.4s] md:text-[15px] text-[9px]`}>{nav.name}</p>
                            {pathname.slice(1) === nav.name.toLowerCase() && <div className='md:hidden w-[40%] mx-auto h-[1.5px] rounded-full bg-foreground mt-1'></div>}
                        </div>
                    </div>
                </Link>
            )
        })}
    </nav>
    <div className='mt-[6rem]'>
        <LineBreak/>
        <div className='md:flex items-center gap-6 hidden md:py-3 md:px-8 mt-3 cursor-pointer'>
            <Cog6ToothIcon className='w-[20px] text-darkText'/>
            <p className='text-[15px]'>Setting</p>
        </div>
    </div>
    </>
  )
}

export default SideBar