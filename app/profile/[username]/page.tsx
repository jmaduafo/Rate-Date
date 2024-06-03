'use client'
import React from 'react'
import NotUser from '@/components/links/profile/NotUserProfile'
import { useParams } from 'next/navigation'

function NotUserProfile({ }) {

  const { username } = useParams()

  return (
    <div><NotUser username={username}/></div>
  )
}

export default NotUserProfile