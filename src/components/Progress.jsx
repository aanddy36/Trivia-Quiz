import React from 'react'
import { useSelector } from 'react-redux'

export const Progress = () => {
    const {index, points, answer} = useSelector(store => store.questions)
    
  return (
    <header className='progress'>
        <progress max='15' value={index + Number(answer !== null)}/>
        <p>Question <strong>{index+1}</strong> / 15</p>
        <p><strong>{points}</strong> / 300</p>
    </header>
  )
}
