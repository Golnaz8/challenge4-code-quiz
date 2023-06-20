var startEl = document.querySelector("#start");
var mainEl = document.querySelector(".main");
var timerEl = document.querySelector("#timer");
var askQuestionEl = document.querySelector(".askQuestion");
var buttonEl = document.querySelector("#button-container");
var quesEl = document.querySelector("#ques");
var chOneEl =document.querySelector("#choice-one");
var chTwoEl = document.querySelector("#choice-two");
var chThreeEl = document.querySelector("#choice-three");
var chFourEl = document.querySelector("#choice-four");


var Score = 0;
var questions = [
    {
        question: "In HTML, which tag is used to define a hyperlink?",
        tests: ["<a>", "<p>", "<div>", "<h1>"],
        answer: chOneEl
    },
    {
        question: "Which CSS property is used to make a background image fixed so that it doesn't scroll with the rest of the page?",
        tests: ["background-attachment", "background-image", "background-position", "background-repeat"],
        answer: chOneEl

    }

]

function makeQuestions(number) {

    askQuestionEl.setAttribute("style", "display: block;")
    
    quesEl.textContent = questions[number-1].question;
    quesEl.setAttribute("style", "display: inline-block;text-align: center; margin-top:15%; margin-left: 30%;");
    chOneEl.textContent = `1) ${questions[number-1].tests[0]}`;
    chOneEl.setAttribute("style", "display: block; margin:10px; margin-left: 30%");
    chTwoEl.textContent = `2) ${questions[number-1].tests[1]}`;
    chTwoEl.setAttribute("style", "display: block; margin:10px; margin-left: 30%");
    chThreeEl.textContent = `3) ${questions[number-1].tests[2]}`;
    chThreeEl.setAttribute("style", "display: block; margin:10px; margin-left: 30%");
    chFourEl.textContent = `4) ${questions[number-1].tests[3]}`;
    chFourEl.setAttribute("style", "display: block; margin:10px; margin-left: 30%");
    



      
      

    buttonEl.addEventListener("click", (event)=> {
        var answerChoice = event.target;
        console.log(answerChoice);
        // if (answerChoice.matches("button")) {
        //     var userChoice = answerChoice.value;
            
        //     return userChoice;
        // }
        if (answerChoice === questions[number-1].answer){
            window.alert("Correct");
            Score += 1;
            nextQuestion();
        }else {
            window.alert("Incorrect")
            nextQuestion();
            secondsLeft = secondsLeft - 5;
        }
    });

    
}



function firstQ(){
    mainEl.setAttribute("style", "display: none;")
    setTime();
    makeQuestions(1);
}
 



startEl.addEventListener("click",firstQ);

var secondsLeft = 40;
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `${secondsLeft} seconds left`;
      timerEl.setAttribute("style", "float: right;")
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
    
      }
    }, 1000);
  }
  