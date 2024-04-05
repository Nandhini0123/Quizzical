import React from "react";
import { useState } from 'react'
import { useEffect } from 'react'
import '../App.css'
export default function QuizPage(props){
    const[renderedButton, setRenderedButton] = useState(true)
    const[selectedAnswer1, setSelectedAnswer1] = useState({})
    const[correctAnswer, setCorrectAnswer] = useState([])
    const[score, setScore] = useState(0)
    const[shuffledAnswers, setShuffledAnswers] = useState([])

  // Onclick function
   function handleClick(){
    setRenderedButton(false);
    console.log("propsquestions", shuffledAnswers)
   }

  //play Again
  function playAgain(){
    props.handleClick();
  }
let correct = '';

// evaluating for correct answers
function handleAnswer(option, id){
  console.log("selectedanswer", option)
  console.log("id", id)
  correct = getCorrectAnswerById(props.questions, id)
  const answer = correct ? correct.correct_answer : null ;
  const updatedSelectedAnswers = { ...selectedAnswer1, [id]: option }; 
        setSelectedAnswer1(updatedSelectedAnswers);
  setScore(prevScore => {
    if(answer[0] === option){
      return  prevScore + 1
     } 
     else{
      return prevScore
     }
  }) 
   console.log(score, "scorefirst")
   console.log(answer[0], "correctanswer")
}


//  calculating score


//  function to get the current ID
function getCorrectAnswerById(array, id){
  return array.find((element) => {
    return element.id === id
  })
  }
 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }
let questionDisplay = []

useEffect(function(){
  
   questionDisplay = props.questions ? props.questions.map((quiz, index) => {
    let shuffled = shuffle([...quiz.answers])
    console.log(shuffled, "shuffled")
   
    
      const shuffledElements = shuffled.map((item, answerIndex) => {
        console.log("checkingcorrect", quiz.correct_answer[0], item )
        const styles = {
          backgroundColor: 
            selectedAnswer1[quiz.id] === item ? "rgb(227, 144, 144)" :
            (!renderedButton && item === quiz.correct_answer[0] ? "#9be8c4" :
            (!renderedButton && selectedAnswer1[quiz.id] === item ? "rgb(227, 144, 144)" : "#d0c4ef"))
        };
     
       return(
        
          <label key={answerIndex} className="answer" htmlFor={`${quiz.id}-${answerIndex}`} style={styles}>
          <input type="radio" 
          name={`question${quiz.id}`}
          value={item}
          id={`${quiz.id}-${answerIndex}`}
           onClick={() => handleAnswer(item, quiz.id)}
           checked={selectedAnswer1[quiz.id] === item} 
           />
          {item}
          </label>
           
       )
        })

   return (
   <div key={index} className="quesAndAns">
       <p className="question"> {quiz.question} </p> 
       <div className="allAnswers">
       {shuffledElements}
       </div>
       
   </div>
    )  }
  ) : "No Questions to Display";
  setShuffledAnswers(questionDisplay)
}, [props.questions, selectedAnswer1, renderedButton])

    return(
        <div>
    
          <div>
            {shuffledAnswers}
          </div>
    
           {renderedButton && <button onClick={handleClick} className="buttons">Check Your Answers</button>}
           {!renderedButton && <div>
            <p>Your Score is : {score}</p> 
            <button onClick={playAgain} className="buttons">Play Again</button>
            </div>
            }
          
        </div>
    )
}