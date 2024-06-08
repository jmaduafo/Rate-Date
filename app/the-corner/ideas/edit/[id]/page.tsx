'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import EditDateIdea from '@/components/links/the-corner/EditDateIdea'

function EditIdea() {
  const { id } = useParams()

  return (
    <div>
      <EditDateIdea idea_id={id}/>
    </div>
  )
}

export default EditIdea