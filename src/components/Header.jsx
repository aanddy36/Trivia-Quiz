import React from 'react'
import { Outlet } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header className='app-header'>
          <h1>The trivia <span>Quiz</span></h1>
      </header>
      <Outlet/>
    </>
  )
}
