import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SocialMedia } from './SocialMedia'
import { selectGameMode } from '../features/difficulty/difficultySlice'
import { useDispatch } from 'react-redux'

export const StartScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (e)=>{
        dispatch(selectGameMode(e.target.value))
        navigate(`/quiz/${e.target.value}`)
      }
      
  return (
    <div className='start-screen'>
        <h2>Welcome to The Trivia Quiz!</h2>
        <h3>15 question to test your general knowledge</h3>
        <h4 style={{marginTop:"20px"}}>First, choose the test difficulty:</h4>
        <div className="game-mode">
            <button className='btn2' value='easy' onClick={(e)=>handleClick(e)} style={{backgroundColor:"#0ee32a"}}>Easy</button>
            <button className='btn2' value='medium' onClick={(e)=>handleClick(e)} style={{backgroundColor:"#e3ce0e"}}>Medium</button>
            <button className='btn2' value='hard' onClick={(e)=>handleClick(e)} style={{backgroundColor:"#fc2121"}}>Hard</button>
        </div>
        <SocialMedia/>
    </div>
  )
}
