import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../useQuiz'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { useFetchQuestions } from '../useFetchQuestions'
import { Progress } from '../components/Progress'
import { Next } from '../components/Next'
import { Timer } from '../components/Timer'

export const Question = () => {
    const {difficulty} = useParams()
    const {gameMode, status, newAnswer, answer, currentQuestion, index} = useGlobalContext()
    useFetchQuestions(gameMode)
    useEffect(()=>{
      window.scrollTo(0, 0);
    },[index])

    const statement = currentQuestion?.question
    const options = currentQuestion?.options
    const hasAnswered = answer !== null
    const styleCat = {
      backgroundColor: difficulty === 'medium' ? '#e3ce0e' : '#fc2121'
    }
  return (
    <main className='main'>
      {status === 'loading' && <Loader/>}
      {status === 'error' && <ErrorMessage/>}
      {status === 'ready' && 
      <>
      <Progress/>
      <div className='question-cont'>
        <div className='category' style={difficulty !== 'easy' ? styleCat : {}}>{difficulty} quiz</div>
        <h4>{statement}</h4>
        <div className="options">
          {options?.map(option=>{
            return <button key={option} className={`btn btn-option ${answer === option ? 
            "answer" : ""} 
            ${hasAnswered ? currentQuestion.correctAnswer === option
            ? "correct" : "" : ""}`} 
            disabled={hasAnswered}
            onClick={()=>newAnswer(option)}>{option}</button>
          })}
        </div>
      </div> 
      <footer>
        <Timer />
        {answer && <Next/>}
      </footer>
      </>}
    </main>
  )
}
