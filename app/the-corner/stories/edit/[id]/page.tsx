'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import EditDateStory from '@/components/links/the-corner/EditDateStory'

function EditStory() {
  const { id } = useParams()

  return (
    <div>
      <EditDateStory story_id={id}/>
    </div>
  )
}

export default EditStory