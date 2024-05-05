'use client'
import React, { useEffect, useState } from 'react'
import Card from '@/components/Card'
import Header3 from '@/components/Header3'
import Gif from '@/app/graphLoading.gif'
import Image from 'next/image'

function TopBar() {
    const [ chartLoading, setChartLoading ] = useState(true)
    
    async function fetchHoroscope() {
        

    }

    useEffect(() => {
        fetchHoroscope()      

    }, [])

  return (
    <div className='flex md:flex-row flex-col gap-6 md:h-[30vh] md:mt-0 mt-8'>
        {/* CHART CARD */}
        <Card className='flex-[1.5]'>
            {
                chartLoading ?
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='w-[60%] object-cover'>
                            <Image src={Gif} alt='laptop chart gif' className='w-full h-full'/>
                        </div>
                    </div>
                    :
                    <div>
                        <Header3 title='Chart Overview'/>
                    </div>
            }
        </Card>
        {/* HOROSCOPE CARD */}
        <Card className='flex-[1.5]'>
            <Header3 title='Daily Horoscope'/>
        </Card>
        {/* TOP DATE CARD */}
        <Card className='flex-[1]'>
            <Header3 title='Top Date'/>
        </Card>
    </div>
  )
}

export default TopBar