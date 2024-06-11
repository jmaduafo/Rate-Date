'use client'
import React, { useState, useEffect } from 'react'
import Navbar from './links/home/Navbar'
import { createClient } from '@/utils/supabase/client'

function CheckNav() {
    const [ loggedIn, setLoggedIn ] = useState<boolean | undefined>()
    const supabase = createClient()

    async function checkLoggedIn() {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

  return (
    <>
        {loggedIn !== undefined && !loggedIn ? <Navbar/> : null}
    </>
  )
}

export default CheckNav