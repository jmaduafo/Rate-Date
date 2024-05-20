import React from 'react'
import Image from 'next/image'

function UsersList() {
  return (
    <div className='cursor-pointer hover:bg-dark10 duration-500 flex items-center gap-4 py-3 px-2 rounded-xl'>
        <div className='w-[40px] h-[40px] rounded-full bg-gray-300'></div>
        <div>
            <p className='font-medium'>Happy House</p>
            <p className='text-[13px] mt-[-5px] tracking-tight text-darkText60'>@happy_clapper</p>
        </div>
    </div>
  )
}

export default UsersList