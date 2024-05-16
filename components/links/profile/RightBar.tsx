import React from 'react'
import Card from '@/components/Card'
import DemographicChart from './DemographicChart'

function RightBar() {
  return (
    <section>
        <Card className='w-full h-[40vh] flex justify-center items-center'>
            <DemographicChart/>
        </Card>
        <Card className='w-full mt-5'>

        </Card>
    </section>
  )
}

export default RightBar