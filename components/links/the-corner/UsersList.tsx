import React from 'react'
import Image from 'next/image'

function UsersList() {
  return (
    <div className='cursor-pointer bg-dark10 duration-500 flex items-center gap-2 py-2 rounded-xl'>
        <div className='w-[30px] h-[30px] rounded-full bg-gray-300'></div>
        <div>
            <p className='font-medium'>Happy House</p>
            <p className='text-[13px] mt-[-3px]'>@happy_clapper</p>
        </div>
    </div>
  )
}

export default UsersList