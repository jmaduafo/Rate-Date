import React from 'react'
import LeftBar from './LeftBar'
import RightBar from './RightBar'

function NotUserProfile({ username }: { username?: string | string[]}) {
  return (
    <div className='flex gap-6 md:flex-row flex-col-reverse'>
      <div className='flex-[3]'>
        <LeftBar username={username}/>
      </div>
      <div className='flex-[1]'>
        <RightBar username={username}/>
      </div>
      </div>
  )
}

export default NotUserProfile