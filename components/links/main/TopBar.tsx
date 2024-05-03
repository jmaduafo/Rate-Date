'use client'
import React, { useEffect } from 'react'
import Card from '@/components/Card'
import Header3 from '@/components/Header3'

function TopBar() {
    
    async function fetchHoroscope() {
        

    }

    useEffect(() => {
        fetchHoroscope()      

    }, [])

  return (
    <div className='flex md:flex-row flex-col gap-6 md:h-[30vh] md:mt-0 mt-8'>
        {/* WEATHER CARD */}
        <Card className='flex-[1.5]'>
            <Header3 title='Weather'/>
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