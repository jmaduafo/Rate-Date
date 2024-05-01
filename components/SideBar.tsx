'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, ChartBarIcon, QueueListIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/solid'

function SideBar() {
    const pathname = usePathname()

    const navigations = [
        {
            name: 'Dashboard',
            icon: <HomeIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[26px] w-[7vw] text-white'/>,
            link: '/dashboard'
        },
        {
            name: 'Charts',
            icon: <ChartBarIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[26px] w-[7vw] text-white'/>,
            link: '/charts'
        },
        {
            name: 'Wishlist',
            icon: <QueueListIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[26px] w-[7vw] text-white'/>,
            link: '/wishlist'
        },
        {
            name: 'Profile',
            icon: <UserCircleIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[26px] w-[7vw] text-white'/>,
            link: '/profile'
        },
        {
            name: 'Logout',
            icon: <LogoutIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[26px] w-[7vw] text-white'/>,
            link: '/login'
        },
    ]

    console.log(pathname)
  return (
    <>
    <div>
        <h5 className='md:text-[25px] md:block hidden'>Rate My Date</h5>
    </div>
    <div className='md:mt-[8rem] md:block w-full flex flex-row justify-evenly items-center'>
        {navigations.map(nav => {
            return (
                <Link key={nav.name} href={nav.link}>
                    <div className='flex md:mb-8 md:flex-row md:items-center md:justify-start md:gap-6 flex-col justify-center items-center '>
                        {nav.icon}
                        <div className=''>
                            <p className='md:text-[15px] text-[9px]'>{nav.name}</p>
                            {pathname.slice(1) === nav.name.toLowerCase() && <div className='md:hidden w-[40%] mx-auto h-[1.5px] rounded-full bg-white mt-1'></div>}
                        </div>
                    </div>
                </Link>
            )
        })}
    </div>
    </>
  )
}

export default SideBar