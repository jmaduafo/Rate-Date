import React from 'react'
import Card from '@/components/Card'

function BottomBar() {
  return (
    <div className='mt-8 gap-6 flex'>
        {/* DATES TABLE */}
        <div className='flex-[5]'>
            <div className=''>
                <button>
                    <span>+</span>
                    <span>Add a Date</span>
                </button>
            </div>
            <Card className='mt-5 h-[45vh]'>
                
            </Card>

        </div>
         {/* UPCOMING DATES */}
         <Card className='flex-[2]'>

         </Card>
    </div>
  )
}

export default BottomBar