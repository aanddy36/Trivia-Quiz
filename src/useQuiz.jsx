import { createContext, useContext, useReducer } from "react";

function shuffleArray(array) {
  const newArray = [...array]; 
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const FETCH_QUESTIONS = 'FETCH_QUESTIONS'
const FAILED_FETCH = 'FAILED_FETCH'
const SELECT_GAME_MODE = 'SELECT_GAME_MODE'
const START_FETCH = 'START_FETCH'
const NEW_ANSWER = 'NEW_ANSWER'
const NEXT_QUESTION = 'NEXT_QUESTION'
const GAME_ENDED = 'GAME_ENDED'
const ONE_SECOND_LESS = 'ONE_SECOND_LESS'

const ContextVariable = createContext()
export const useGlobalContext = ()=> useContext(ContextVariable)

const initialState = {
  questions: [],
  gameMode: null,
  //loading, error, ready, active, finished
  status: 'ready',
  index: 0, 
  currentQuestion: {},
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 210
}

const reducer = (state, action)=>{
  if(action.type === START_FETCH){
    return{
      ...state, status: 'loading'
    }
  }
  if(action.type === FETCH_QUESTIONS){
    let temp = action.payload.data[0]
    let newArray = {id: temp.id, 
      correctAnswer: temp.correctAnswer, 
      question: temp.question.text,
      options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer])
    }
    return {
      ...state,
      questions: action.payload.data,
      status:'ready',
      currentQuestion: newArray,
      answer: null,
      points: 0,
      index: 0,
      secondsRemaining: 210
    }
  }
  if(action.type === FAILED_FETCH){
    return{
      ...state, status: 'error'
    }
  }
  if(action.type === SELECT_GAME_MODE){
    return {
      ...state,
      gameMode: action.payload.game
    }
  }
  if(action.type === NEXT_QUESTION){
    let temp = state.questions[state.index + 1]
    let newArray = {id: temp.id, 
      correctAnswer: temp.correctAnswer, 
      question: temp.question.text,
      options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer])
    }
    return {
      ...state,
      index: state.index + 1,
      currentQuestion: newArray,
      answer: null
    }
  }
  if(action.type === NEW_ANSWER){
    return {
      ...state,
      answer: action.payload.answer,
      points: action.payload.answer === state.currentQuestion.correctAnswer ? 
              state.points + 20 : state.points
    }
  }
  if(action.type === ONE_SECOND_LESS){
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1
    }
  }
  if(action.type === GAME_ENDED){
    return {
      ...state,
      highscore: state.points > state.highscore ? state.points : state.highscore,
      secondsRemaining: 210
    }
  }
  throw new Error("Action unknown")
}

export const ContextComponent = ({children}) => {
  const [
    {questions,
      status, 
      gameMode,
      index,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining}
    , dispatch] = useReducer(reducer, initialState)

    const fetchQuestions = (data)=>{
      dispatch({type: FETCH_QUESTIONS, payload: {data}})
    }
    const failedFetch = ()=>{
      dispatch({type: FAILED_FETCH}) 
    }
    const selectGameMode = (game)=>{
      dispatch({type: SELECT_GAME_MODE, payload: {game}})
    }
    const startFetching = () =>{
      dispatch({type: START_FETCH}) 
    }
    const newAnswer = (answer) =>{
      dispatch({type: NEW_ANSWER, payload: {answer}}) 
    }
    const nextQuestion = ()=>{
      dispatch({type: NEXT_QUESTION})
    }
    const gameFinished = ()=>{
      dispatch({type: GAME_ENDED})
    }
    const lessSeconds = ()=>{
      dispatch({type: ONE_SECOND_LESS})
    }
    
  return (
    <ContextVariable.Provider value={
      {questions,
      status, 
      gameMode,
      index,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining,
      fetchQuestions,
      failedFetch,
      selectGameMode,
      startFetching,
      newAnswer,
      nextQuestion,
      gameFinished,
      lessSeconds
    }
    }>
        {children}
    </ContextVariable.Provider>
  )
}
