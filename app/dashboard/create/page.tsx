import React from 'react'
import CreateEditCard from '@/components/CreateEditCard'
import Header2 from '@/components/Header2'

function DashboardCreate() {
    

  return (
    <div>
        <div className='text-darkText mb-8'>
            <Header2 title='Create a Date'/>
        </div>
        <form>
            <CreateEditCard title='Name' description="What's the name of your date?">
                <input type='text' name='dateName' placeholder='John' className='lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5'/>
            </CreateEditCard>
            <CreateEditCard title='Name' description="What's the name of your date?">
                <input type='text' name='dateName' placeholder='John' className='lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5'/>
            </CreateEditCard>
            <CreateEditCard title='Name' description="What's the name of your date?">
                <input type='text' name='dateName' placeholder='John' className='w-[70%] outline-none border-none rounded-lg py-2 px-5'/>
            </CreateEditCard>
            <CreateEditCard title='Name' description="What's the name of your date?">
                <input type='text' name='dateName' placeholder='John' className='w-[70%] outline-none border-none rounded-lg py-2 px-5'/>
            </CreateEditCard>
            <CreateEditCard title='Name' description="What's the name of your date?">
                <input type='text' name='dateName' placeholder='John' className='w-[70%] outline-none border-none rounded-lg py-2 px-5'/>
            </CreateEditCard>
        </form>
    </div>
  )
}

export default DashboardCreate