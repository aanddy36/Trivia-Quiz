import React from 'react'
import { useGlobalContext } from '../useQuiz'

export const Progress = () => {
    const {index, points, answer} = useGlobalContext()
  return (
    <header className='progress'>
        <progress max='15' value={index + Number(answer !== null)}/>
        <p>Question <strong>{index+1}</strong> / 15</p>
        <p><strong>{points}</strong> / 300</p>
    </header>
  )
}
