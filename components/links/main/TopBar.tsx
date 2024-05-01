'use client'
import React, { useEffect } from 'react'
import Card from '@/components/Card'

function TopBar() {
    
    async function fetchHoroscope() {
        // const url = 'https://daily-horoscope-api.p.rapidapi.com/api/Daily-Horoscope-English/?zodiacSign=aries&timePeriod=today';
        // const options = {
        // method: 'GET',
        // headers: {
        //     'X-RapidAPI-Key': '0e976a1fbbmsh7ac8e1b1601c05bp18248fjsnca2701bd4fc5',
        //     'X-RapidAPI-Host': 'daily-horoscope-api.p.rapidapi.com'
        // }
        // };

        // try {
        //     const response = await fetch(url, options);
        //     const result = await response.text();
        //     console.log(result);
        // } catch (error) {
        //     console.error(error);
        // }

    }

    useEffect(() => {
        fetchHoroscope()      

    }, [])

  return (
    <div className='flex md:flex-row flex-col gap-6 md:h-[30vh]'>
        {/* WEATHER CARD */}
        <Card className='flex-[1.5]'>
            <p>Hi</p>
        </Card>
        {/* HOROSCOPE CARD */}
        <Card className='flex-[1.5]'>
            <p>Hi</p>

        </Card>
        {/* TOP DATE CARD */}
        <Card className='flex-[1]'>
            <p>Hi</p>

        </Card>
    </div>
  )
}

export default TopBar