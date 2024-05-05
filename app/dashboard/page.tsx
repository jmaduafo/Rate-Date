import TopBar from '@/components/links/main/TopBar'
import BottomBar from '@/components/links/main/BottomBar'
import { createClient } from '@/utils/supabase/client'

type User = {
  id: string
}

function MainDashboard() {
  return (
    <div className='md:block flex flex-col-reverse'>
      <TopBar/>
      <BottomBar />    
    </div>
  )
}

export default MainDashboard