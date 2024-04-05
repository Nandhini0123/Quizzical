import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StartPage from './Component/StartPage.jsx'
import QuizPage from './Component/QuizPage.jsx'
import {nanoid} from "nanoid"

function App() {
   const[currentPage, setCurrentPage] = useState('StartPage')
  const[getQuiz, setGetQuiz] =  useState(false)
   const[quizQuestions, setQuizQuestions]  = useState([])
   const [loading, setLoading] = useState(false)


   function navigateTo(page){
    setCurrentPage(page)
   }
   const receiveDataFromStart = (data) => {
    console.log("Data received from child:", data);
    setGetQuiz(data);
};
   useEffect(() => {
   if(getQuiz){
    setLoading(true)
    const abortController = new AbortController(); 
    const signal = abortController.signal;

    fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`, { signal })
    .then(res => res.json())
    .then(data => {
      setGetQuiz(false)
      let questions = []
        for(let i = 0; i < 5; i++){
          questions.push({
            question: data.results[i].question,
            id: nanoid(),
            answers: [data.results[i].correct_answer, ...data.results[i].incorrect_answers],
            correct_answer: [data.results[i].correct_answer],
            incorrect: data.results[i].incorrect_answers});
        }

        setQuizQuestions(questions);
        
    })
    .catch(error => {
        setLoading(false)
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
            
        } else {
            console.error('Error fetching data:', error);
        }
    });
   
    return () => {
        abortController.abort(); 
    };
}}, [getQuiz]); 



  return (
    <>
      {currentPage === 'StartPage' && <StartPage handleClick={()=>navigateTo('QuizPage')}  sendData={receiveDataFromStart}/>}
      {currentPage === 'QuizPage' && <QuizPage questions={quizQuestions} handleClick={()=>navigateTo('StartPage')} />}

    </>
    
  )
}
export default App


