'use client'
import React, { useEffect } from 'react'

function Horoscope({ setHoroscope, horoscope }: { readonly setHoroscope: React.Dispatch<React.SetStateAction<string | undefined>>; readonly horoscope: string | undefined}) {

  async function getQuote() {
    try {
      const res = await fetch("https://type.fit/api/quotes", { cache: 'no-store'})
      const data = await res.json()

      setHoroscope(data[0].text)
      console.log(data)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getQuote()
  }, [horoscope])

  return (
    <div>
      {horoscope && <p>{horoscope}</p>}
    </div>
  )
}

export default Horoscope