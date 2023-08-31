import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { gameEnded, nextQuestion } from '../features/questions/questionsSlice'

export const Next = () => {
    const {index} = useSelector(store => store.questions)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFinish = ()=>{
        dispatch(gameEnded())
        navigate('/results')
    }

  if(index < 14) return (
    <button className='btn btn-ui' onClick={()=>dispatch(nextQuestion())}>Next</button>
  )
  
  return (
    <button className='btn btn-ui' onClick={handleFinish}>Finish</button>
  )
}
