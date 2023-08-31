import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { lessSeconds, restartTimer } from '../features/timer/timerSlice'
import { gameEnded } from '../features/questions/questionsSlice'

export const Timer = () => {
    const {secondsRemaining} = useSelector(store => store.timer)
    const mins = Math.floor(secondsRemaining/60)
    const sec = secondsRemaining % 60
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(secondsRemaining === 0){
            dispatch(gameEnded())
            dispatch(restartTimer())
            navigate('/results')
        }
    },[secondsRemaining])

    useEffect(()=>{
        const timer = setInterval(()=>{
            dispatch(lessSeconds())
        }, 1000)
        return ()=>clearInterval(timer)
    },[])
    
  return (
    <div className='timer'>{mins < 10 && "0"}{mins}:{sec < 10 && "0"}{sec}</div>
  )
}
