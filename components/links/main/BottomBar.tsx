import React from 'react'
import Card from '@/components/Card'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import { PlusIcon } from '@heroicons/react/24/solid'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Header3 from '@/components/Header3'
import Header4 from '@/components/Header4'
import SingleDateList from '@/components/SingleDateList'

function BottomBar() {
    const data = [
        {
            dateName: 'Oliver',
            dueDate: '2 days',
        },
        {
            dateName: 'Mauricio',
            dueDate: '6 days',
        },
        {
            dateName: 'Kallum',
            dueDate: '1 week',
        },
    ]
  return (
    <div className='mt-8 gap-6 flex'>
        {/* DATES TABLE */}
        <div className='flex-[5]'>
            <div className='flex gap-4'>
                <PrimaryButton className='flex items-center gap-2'>
                    <PlusIcon className='w-4'/>
                    <p className='text-[13px]'>Add a Date</p>
                </PrimaryButton>
                <SecondaryButton className='flex justify-center items-center px-2'>
                    <AdjustmentsHorizontalIcon strokeWidth={1} className='w-6'/>
                </SecondaryButton>        
            </div>
            <Card className='mt-5 h-[45vh]'>
                
            </Card>
        </div>
         {/* UPCOMING DATES */}
         <Card className='flex-[2]'>
            <div className='mb-[4rem]'>
                <Header4 title='Upcoming Dates'/>
            </div>
            {data.map(date => {
                return (
                    <div className='mb-3' key={date.dateName}>
                        <SingleDateList>
                            <p className='text-[15px]'>{date.dateName}</p>
                            <p className='italic text-[10px] text-darkText60'>in {date.dueDate}</p>
                        </SingleDateList>

                    </div>
                )
            })}
         </Card>
    </div>
  )
}

export default BottomBar