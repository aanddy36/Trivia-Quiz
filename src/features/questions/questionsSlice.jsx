import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function shuffleArray(array) {
    const newArray = [...array]; 
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

const initialState = {
    questionsRedux: [],
    //loading, error, ready
    status: 'ready',
    index: 0, 
    currentQuestion: {},
    answer: null,
    points: 0,
    highscore: 0
}

export const getQuestions = createAsyncThunk('questions/getQuestions', async (difficulty)=>{
    try{
        const resp = await fetch(`https://the-trivia-api.com/v2/questions?limit=15&difficulties=${difficulty}`)
        return resp.json()
    }catch(err){
        console.log(err);
    }
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers:{
        newAnswer: (state, {payload}) =>{
            state.answer = payload
            state.points = payload === state.currentQuestion.correctAnswer ? 
                state.points + 20 : state.points
        },
        nextQuestion: (state)=>{
            let temp = state.questionsRedux[state.index + 1]
            let newArray = {id: temp.id, 
              correctAnswer: temp.correctAnswer, 
              question: temp.question.text,
              options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer])
            }
            state.index += 1
            state.currentQuestion= newArray
            state.answer= null
        },
        gameEnded: (state) =>{
            state.highscore= state.points > state.highscore ? state.points : state.highscore
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getQuestions.pending, (state)=>{
            state.status = 'loading'
        }).addCase(getQuestions.fulfilled,(state, {payload})=>{
            console.log(payload);
            let temp = payload[0]
            let newArray = {id: temp.id, 
                correctAnswer: temp.correctAnswer, 
                question: temp.question.text,
                options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer])
              }
            state.status = 'ready'
            state.questionsRedux = payload
            state.currentQuestion= newArray
            state.index = 0
            state.points = 0
            state.answer = null
        }).addCase(getQuestions.rejected, (state)=>{
            state.status = 'error'
        })
    }
})

export const {newAnswer, nextQuestion, gameEnded} = questionsSlice.actions
export default questionsSlice.reducer