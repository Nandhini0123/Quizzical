import React from "react";
import '../App.css'
export default function StartPage(props){
    const handleStartQuiz = () => {
        const data = true;
        props.sendData("Data from child component", data);
        props.handleClick();
    };
    return(
        <div>
            <h1>Quizzical</h1>
            <p>Test Your Knowledge</p>
            <button onClick={handleStartQuiz} className="buttons">Start Quiz</button>
        </div>
    )
}