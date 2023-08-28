import React from 'react'
import { useGlobalContext } from '../useQuiz'
import { useNavigate } from 'react-router-dom'

export const Next = () => {
    const {nextQuestion, index, gameFinished} = useGlobalContext()
    const navigate = useNavigate()
    const handleFinish = ()=>{
        gameFinished()
        navigate('/results')
    }
  if(index < 14) return (
    <button className='btn btn-ui' onClick={nextQuestion}>Next</button>
  )
  return (
    <button className='btn btn-ui' onClick={handleFinish}>Finish</button>
  )
}
