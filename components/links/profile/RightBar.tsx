import React from 'react'
import Card from '@/components/Card'

function RightBar() {
  return (
    <section>
        <Card className='w-full h-[40vh] flex justify-center items-center'>
            <div className='w-[11vw] h-[11vw] rounded-full bg-black'></div>
        </Card>
        <Card className='w-full mt-5'>

        </Card>
    </section>
  )
}

export default RightBar