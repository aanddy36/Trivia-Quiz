import React, { useEffect } from 'react'
import { useGlobalContext } from '../useQuiz'
import { useNavigate } from 'react-router-dom'

export const Timer = () => {
    const {lessSeconds, secondsRemaining, gameFinished, gameMode, questions} = useGlobalContext()
    const navigate = useNavigate()
    const mins = Math.floor(secondsRemaining/60)
    const sec = secondsRemaining % 60
    useEffect(()=>{
        if(secondsRemaining === 0){
            console.log(`Game mode: ${gameMode}`);
            gameFinished()
            navigate('/results')
        }
    },[secondsRemaining])
    useEffect(()=>{
        const timer = setInterval(()=>{
            lessSeconds()
        }, 1000)
        return ()=>clearInterval(timer)
    },[])
  return (
    <div className='timer'>{mins < 10 && "0"}{mins}:{sec < 10 && "0"}{sec}</div>
  )
}
