import React from 'react'

function SubmitButton({title}: { title: string}) {
  return (
    <button type='submit' className="w-full text-myForeground bg-green-700 rounded border-none outline-none px-3 py-2 text-[15px]">
      {title}
    </button>
  )
}

export default SubmitButton