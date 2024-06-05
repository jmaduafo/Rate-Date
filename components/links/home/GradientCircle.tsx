import React from 'react'

function GradientCircle({ classNamePosition, classNameAnimate }: {classNamePosition?: string; classNameAnimate?: string;}) {
  return (
    <div className={`absolute ${classNamePosition} ${classNameAnimate} z-[-1] transform translate-x-[-50%] translate-y-[-50%] bg-gradient-to-t from-gradientBottom to-gradientTop blur-3xl w-[40vw] h-[40vw] rounded-full`}></div>
  )
}

export default GradientCircle