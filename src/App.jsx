import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header'
import { Main } from './pages/Main'
import { Question } from './pages/Question'
import { FinishedScreen } from './pages/FinishedScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header/>}>
          <Route index element={<Main/>}/>
          <Route path='quiz/:difficulty' element={<Question/>}/>
          <Route path='results' element={<FinishedScreen/>}/>
        </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
