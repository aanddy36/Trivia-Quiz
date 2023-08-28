import React, { useEffect } from 'react'
import { useGlobalContext } from './useQuiz'

export const useFetchQuestions = (difficulty) => {
    const {failedFetch, fetchQuestions, startFetching} = useGlobalContext()
    useEffect(()=>{
        if(!difficulty) return
        const requestApi = async ()=>{
            startFetching()
            try{
              const resp = await fetch(`https://the-trivia-api.com/v2/questions?limit=15&difficulties=${difficulty}`)
              if(!resp.ok){
                return failedFetch()
              }
              const data = await resp.json()
              fetchQuestions(data)
            }catch(err){
              return failedFetch() 
            }
          }
          requestApi()
    },[difficulty])
  return (
    <>
    </>
  )
}
