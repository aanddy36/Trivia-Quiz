import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SocialMedia } from '../components/SocialMedia'
import { useSelector } from 'react-redux'

export const FinishedScreen = () => {
    const {points, highscore} = useSelector(store => store.questions)
    const {gameMode} = useSelector(store => store.difficulty)
    const percentage = Math.ceil(points*100/300)
    const navigate = useNavigate()
    
    let congrats
    if(percentage === 100) congrats = "Perfect!"
    if(percentage >= 80 && percentage < 100) congrats = "Excellent!"
    if(percentage >= 50 && percentage < 80) congrats = "Good!"
    if(percentage > 0 && percentage < 50) congrats = "Bad luck!"
    if(percentage === 0) congrats = "Oh no!"

  return (
    <>
        <p className='result'>
           {congrats} You scored <strong>{points}</strong> out of 300 ({percentage}%)
        </p>
        <p className='highscore'>(Highscore: {highscore} points)</p>
        <div className='reset-btns'>
            <button className='btn' onClick={()=>navigate(`/`)}>Main Menu</button>
            <button className='btn' onClick={()=>navigate(`/quiz/${gameMode}`)}>Reset</button>
        </div>
        <SocialMedia/>
    </>
  )
}
