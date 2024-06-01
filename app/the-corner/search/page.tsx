import MainSearchPage from '@/components/links/the-corner/MainSearchPage'
import React from 'react'

function TheCornerSearch({ searchParams }: { searchParams: { search: string}}) {

  return (
    <div>
      <MainSearchPage searchParams={searchParams}/>
    </div>
  )
}

export default TheCornerSearch