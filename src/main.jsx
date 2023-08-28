import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextComponent } from './useQuiz.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextComponent>
      <App />
    </ContextComponent>
)
