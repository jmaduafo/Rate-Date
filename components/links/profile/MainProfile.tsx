import React from 'react'
import RightBar from './RightBar'
import LeftBar from './LeftBar'


function MainProfile() {
  return (
    <div className='flex gap-6 md:flex-row flex-col-reverse'>
      <div className='flex-[3]'>
        <LeftBar/>
      </div>
      <div className='flex-[1]'>
        <RightBar/>
      </div>
    </div>
  )
}

export default MainProfile