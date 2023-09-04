# The Trivia Quiz
## Description
### 1. Introduction
In this game you must answer 15 random general-knowledge questions  of different categories in less than 3:30 minutes. The questions are retrieved from the open source [Trivia API](https://the-trivia-api.com/).

### 2. Home Page
First you have to pick the difficulty of the trivia: easy, medium or hard. Then the request will be sent to the API and you will see the questions.

### 3. Questions Page
Once you start, the timer will begin to count. You have to pick among four possible answers randomly shuffled. At the top you will see your progress as well as the score (each question equals 30 points). Once you answer a Next button will appear.

### 4. Results Page
Either when the time runs out or when all questions are answered you will see the result: the percentage of correct answers, the score, and the highest score in the session. 
Then you can go back to the main menu or reset the trivia with the same difficulty (with different questions).

## Technologies used
- React
- React Router
- Redux Toolkit
- JavaScript
- CSS

## Concepts Applied
-   _**Global State Management**_  using Redux Toolkit
- ***Routing*** with React Router library
- ***Data fetching*** from external API
- ***Custom Hook*** for data fetching
- Responsive for all devices
- ***Hooks***: useEffect, useReducer, useContext.
